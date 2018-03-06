const _path = require('path')
const spawn = require('child_process').spawn
// golang backend support
const DEVELOPING = process.cwd() !== '/'
const GOPHER_FILENAME = 'Eris Support'
const DEFAULT_PORT = 4569
let gopherPath = _path.join(process.resourcesPath, 'app.asar.unpacked',
  GOPHER_FILENAME)
if (DEVELOPING) {
  gopherPath = './' + GOPHER_FILENAME
}
const {ipcMain} = require('electron')

class Gopher {
  constructor (path) {
    this.path = path
    this.port = DEFAULT_PORT
    this._onStart = []
  }

  start () {
    this.handler = spawn(gopherPath, [this.port])
    this._onStart.forEach(callback => callback(this.port))
    console.log('Running with port:', this.port)

    this.handler.stdout.on('data', (data) => {
      // if (isIpcMessage(data)) {
      //   ipcMain.send()
      // } else {
      console.log(`stdout: ${data}`)
      // }
    })
    this.handler.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })
    this.handler.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (!this.terminating) {
        console.log('restart...')
        this.port++
        this.start()
      }
    })
  }

  kill () {
    if (this.handler && this.handler.kill) {
      this.terminating = true
      return this.handler.kill()
    }
  }

  onStart (callback) {
    if (typeof callback === 'function') {
      this._onStart.push(callback)
    }
  }
}

module.exports = new Gopher(gopherPath)
