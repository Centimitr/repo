const fs = require('fs-extra-promise');
const path = require('path');
const os = require('os');
const {BrowserWindow} = require('electron').remote;

const BookTask = require('./bookTask');
const sleep = function (interval) {
    console.log('wait for', interval, 'ms');
    return new Promise(resolve => setTimeout(() => resolve(), interval));
};
const fn = function (path, ...args) {
    return `(${ require(path).toString()})(${args.map(arg => {
        const map = {
            string: arg => `'${arg}'`,
            number: arg => arg,
            object: arg => JSON.stringify(arg)
        };
        return map[typeof arg](arg);
    }).join(', ')})`;
};

const loadX = async function (url, options) {
    const win = new BrowserWindow(options);
    win.exec = (...args) => win.webContents.executeJavaScript(...args);
    return new Promise(resolve => {
        win.loadURL(url);
        win.webContents.once('dom-ready', () => {
            resolve(win);
        });
    });
};
const saveBook = async function (task) {
    const saveImages = async function (task) {
        const win = await loadX(task.url, {show: true, webPreferences: {webSecurity: false}});
        const progressNotifyKey = task.url;
        const e = await win.exec(fn('./script/saveImages', task.dest, task.total, progressNotifyKey));
        if (e) {
            console.warn(e);
        }
        win.close();
    };
    const dst = task.dest;
    await fs.ensureDirAsync(dst);
    {
        // for (let i = 1; i <= task.total; i++) {
        //     const url = task.url.slice(0, -1) + `-p${i}/`;
        //     task.add(new ImgTask(url, dst, i));
        // }
    }
    await saveImages(task);
    task.transform();
    await fs.writeJsonAsync(path.join(dst, 'book.json'), task);
};
const getSeriesBookTasks = async function (url) {
    const dst = path.join(os.tmpdir(), 'com.devbycm.eris', url);
    console.log(dst);
    await fs.ensureDirAsync(dst);
    const win = await loadX(url, {show: false});
    const args = await win.exec(fn('./script/getBooks'));
    const tasks = args.map(a => new BookTask(...a));
    win.close();
    await fs.writeJsonAsync(path.join(dst, 'series.json'), tasks);
    tasks.forEach(t => {
        t.setDest(dst);
        t.setFn(saveBook);
    });
    return tasks;
};

module.exports = {
    saveBook,
    getSeriesBookTasks
};
