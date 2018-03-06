const {ipcRenderer} = window['require']('electron');

class Args {

    constructor() {
        this.sema = 0;
        this._promise = new Promise(resolve => this._resolve = resolve);
    }

    check() {
        if (this._resolve && this.sema >= 2) {
            this._resolve();
        }
    }

    wait() {
        return this._promise;
    }
}

const args = new Args();

ipcRenderer.on('path', (event, message) => {
    console.warn('PATH:', message);
    args.path = message;
    args.sema++;
    args.check();
});
ipcRenderer.on('port', (event, message) => {
    console.warn('PORT:', message);
    args.port = message;
    args.sema++;
    args.check();
});

module.exports = args;
