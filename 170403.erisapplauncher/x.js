class Server {
    constructor() {
        const {ipcMain} = require('electron');
        this.users = [];
        ipcMain.on('x.reg', e => this.users.push(e.sender));
        ipcMain.on('x.send', (e, ...args) => {
            this.users = this.users.map(receiver => {
                if (receiver && !receiver.isDestroyed()) {
                    receiver.send('x.recv', ...args);
                    return receiver;
                }
            }).filter(b => b);
        });
        console.log('x!')
    }
}

module.exports = new Server();
