module.exports = function (dst, total, progressNotifyKey) {
    const fs = require('fs');
    const path = require('path');
    const contents = require('electron').remote.getCurrentWindow().webContents;
    const toArray = function (nodeList) {
        return Array.prototype.slice.call(nodeList);
    };
    const qs = function (selector) {
        return document.querySelector(selector);
    };
    const getImgBuf = async function (img) {
        const imgToBlob = async function (img) {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            return new Promise(resolve => canvas.toBlob(resolve, 'image/webp'));
        };
        const blobToBuffer = async function () {
            return new Promise((resolve, reject) => {
                const toBuf = function (blob, cb) {
                    if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
                        throw new Error('first argument must be a Blob')
                    }
                    if (typeof cb !== 'function') {
                        throw new Error('second argument must be a function')
                    }

                    let reader = new FileReader();

                    function onLoadEnd(e) {
                        reader.removeEventListener('loadend', onLoadEnd, false);
                        if (e.error) cb(e.error);
                        else cb(null, Buffer.from(reader.result));
                    }

                    reader.addEventListener('loadend', onLoadEnd, false);
                    reader.readAsArrayBuffer(blob);
                };
                toBuf(blob, function (err, buffer) {
                    if (err) {
                        reject(err);
                    }
                    resolve(buffer);
                })
            })
        };
        const blob = await imgToBlob(img);
        return blobToBuffer(blob)
    };
    class TaskMarker {
        constructor() {
            // state: have been run
            this.states = {};
            class Listener {
                constructor(chan, cb) {
                    this.chan = chan;
                    this.cb = cb;
                }
            }
            class Client {
                constructor() {
                    this.list = [];
                    this.ipc = require('electron').ipcRenderer;
                    this.ipc.send('x.reg');
                    this.ipc.on('x.recv', (e, chan, ...args) => {
                        this.list.forEach(l => {
                            if (l.chan === chan) {
                                l.cb(...args);
                            }
                        })
                    })
                }

                send(chan, ...args) {
                    this.ipc.send('x.send', chan, ...args);
                }

                on(chan, cb) {
                    this.list.push(new Listener(chan, cb));
                }
            }
            this.c = new Client();
        }

        run(id, fn) {
            if (!this.states[id]) {
                this.states[id] = true;
                fn();
                this.c.send(progressNotifyKey, id);
            }
        }
    }

    return new Promise((resolve, reject) => {
        try {
            const marker = new TaskMarker();
            const showImageDiv = qs('#showimage');
            let cnt = 1;
            const runFn = async () => {
                const img = qs('#cpimg');
                const buf = await getImgBuf(img);
                const p = path.join(dst, cnt + '.webp');
                fs.writeFileSync(p, buf);
                contents.sendInputEvent({
                    type: 'mouseDown',
                    x: img.x + 10,
                    y: img.y + 10,
                });
                contents.sendInputEvent({
                    type: 'mouseUp',
                    x: img.x + 10,
                    y: img.y + 10,
                });
                if (cnt === total) {
                    resolve();
                }
                cnt++;
            };
            const mo = new MutationObserver(() => {
                const img = qs('#cpimg');
                const i = parseInt('' + cnt);
                img.addEventListener('load', () => {
                    marker.run(i, runFn)
                });
                if (img.complete) {
                    marker.run(i, runFn)
                }
            });
            mo.observe(showImageDiv, {attributes: true, childList: true, subtree: true});
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
};
