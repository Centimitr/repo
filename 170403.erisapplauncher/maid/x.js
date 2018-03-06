class Listener {
    constructor(chan, cb) {
        this.chan = chan;
        this.cb = cb;
    }
}

class Client {
    constructor() {
        console.log('x Client!');
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

module.exports = new Client();
