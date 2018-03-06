const exec = require('child_process').execSync;
const fs = require('fs-extra-promise');
// "pack": "build --dir",
// "dist": "build",
const time = function (word, cb) {
    console.time(word);
    cb();
    console.timeEnd(word);
};
const modify = function (filename, from, to) {
    return fs.writeFileSync(filename, fs.readFileSync(filename).toString().replace(from, to));
};
const DEV = `main.loadURL('http://localhost:4200')`;
const DEPLOY = `main.loadURL(url.format({pathname: path.join(__dirname, 'app', 'index.html'), protocol: 'file:', slashes: true}))`;

const OMIT_BUILD = false;
time('Total', () => {
    time('Bump', () => {
        const p = fs.readJsonSync('package.json');
        p.build.buildVersion = `${parseInt(p.build.buildVersion) + 1}`;
        fs.writeJsonSync('package.json', p);
    });
    time('Clean', () => exec('rm -rf ./dist'));
    time('Modify', () => modify('app.js', DEV, DEPLOY));
    time('Build Support', () => exec('go build', {cwd: '/Users/shixiao/go/src/erisapp.com/'}));
    time('Build App', () => exec('ng build', {cwd: '../viewer/'}));
    time('Collect', () => exec('node ./collect.js'));
    time('Build DMG', () => !OMIT_BUILD && exec('build'));
    time('Recover', () => modify('app.js', DEPLOY, DEV));
    console.log();
});
