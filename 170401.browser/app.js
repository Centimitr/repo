const path = require('path')
const url = require('url')
const electron = require('electron')
const {app, BrowserWindow, Menu, protocol} = electron

const m = require('./windows').manager

protocol.registerStandardSchemes(['kitsune'])
app.on('ready', () => {
  // set menu
  Menu.setApplicationMenu(require('./menu')(m))

  // set protocol
  protocol.registerFileProtocol('kitsune', (request, callback) => {
    const url = require('./url').map(request.url)
    // console.log(url)
    callback({path: path.normalize(path.resolve(__dirname, 'internal', url))})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  // create
  m.create()
})
app.on('new-window-for-tab', (event) => {
  event.preventDefault()
  m.create()
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (m.empty()) {
    m.create()
  }
})
