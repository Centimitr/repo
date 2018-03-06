const {server} = require('./x')
const gopher = require('./gopher')
gopher.start()

const {app, Menu, MenuItem, BrowserWindow, ipcMain} = require(
  'electron')
const path = require('path')
const url = require('url')

app.commandLine.appendSwitch('disable-http-cache')
app.commandLine.appendSwitch('no-proxy-server')
app.commandLine.appendSwitch('ignore-certificate-errors')
let associatePath

let main

function createWindow () {
  const size = require('electron').screen.getPrimaryDisplay().workAreaSize
  // const wh = Math.floor(size.height * 0.85), ww = Math.floor(wh / 0.68)
  main = new BrowserWindow({
    width:          1050,
    height:         695,
    minWidth:       780,
    minHeight:      550,
    // titleBarStyle:  'default',
    // titleBarStyle:   'inset',
    // vibrancy: 'ultra-dark',
    vibrancy:       'light',
    // backgroundColor: '#000000',
    // backgroundColor: '#dedede',
    // show:            false,
    // autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      // scrollBounce:         false,
      // experimentalFeatures: true,
      plugins:     false,
    },
  })

  // main.webContents.openDevTools();
  // main.loadURL('file://' + path.join(__dirname, 'test.html?p=' + associatePath));
  // main.loadURL('file://' + path.join(__dirname,'maid', 'maid.html'));
  // main.webContents.openDevTools()
  main.loadURL('http://localhost:4200')
  ipcMain.on('req', (event, arg) => {
    event.sender.send('res', gopher.port)
  })
  main.on('closed', () => {
    main = null
  })
}

app.on('open-file', (e, p) => {
  associatePath = p
  if (main) main.webContents.send('path', p)
})
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (main === null) createWindow()
})
app.on('quit', () => gopher.kill())
