const electron = require('electron')
const path = require('path')
const url = require('url')
const {app, globalShortcut, Menu, BrowserWindow} = require('electron')

let container
const createWindow = function () {
    // const display = electron.screen.getPrimaryDisplay()
    // container = new BrowserWindow({
    //     width: display.size.width,
    //     height: display.size.height - display.workArea.y,
    //     x: 0,
    //     y: display.workArea.y,
    //     frame: false,
    //     transparent: true,
    //     resizable: false,
    //     movable: false,
    //     fullscreenable: false,
    //     autoHideMenuBar: true,
    //     // alwaysOnTop: true
    // })
    const scale = 0.4
    container = new BrowserWindow({
        width: Math.floor(1366 * scale),
        height: Math.floor(1024 * scale),
        title: 'Remote Browser Trackpad',
        // frame: false,
        resizable: false,
        // movable: false,
        // fullscreenable: false,
        // autoHideMenuBar: true,
        // alwaysOnTop: true,
        vibrancy: "light",
        // titleBarStyle: "hiddenInset"
    })
    // console.log(__dirname, `index.html/?y=${display.workArea.y}`)
    container.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    container.on('closed', () => container = null)
}

app.on('ready', () => {
    (() => {
        const template = [{
            label: 'Debug',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
            ]
        },
            // {
            //     role: 'help',
            //     submenu: [
            // {
            //     label: 'Learn More',
            //     click() {
            //         require('electron').shell.openExternal('https://electron.atom.io')
            //     }
            // }
            // ]
            // }
        ]
        if (process.platform === 'darwin') {
            template.unshift({
                label: app.getName(),
                submenu: [
                    {role: 'about'},
                    {type: 'separator'},
                    {role: 'services', submenu: []},
                    {type: 'separator'},
                    {role: 'quit'}
                ]
            })
        }
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    })()
    createWindow()
    // app.dock.hide()
    globalShortcut.register('Alt+Shift+Z', () => {
        const visible = container.isVisible()
        if (visible) container.hide()
        else container.show()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
    if (container === null) createWindow()
})
