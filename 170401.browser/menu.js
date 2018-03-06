const electron = require('electron')
const {app, BrowserWindow, Menu} = electron

module.exports = function (m) {
  const template = [
    {
      label:   'File',
      submenu: [
        {
          label:       'New Tab',
          accelerator: 'CmdOrCtrl+T',
          click () {m.create()},
        },
        {
          label:       'Open Location...',
          accelerator: 'CmdOrCtrl+L',
          click () {
            const focused = BrowserWindow.getFocusedWindow()
            m.location.show(focused)
          },
        },
        {type: 'separator'},
        {
          label:       'Close Tab',
          accelerator: 'CmdOrCtrl+W',
          click () {
            const w = BrowserWindow.getFocusedWindow()
            w.close()
          },
        },
      ],
    }, {
      label:   'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
      ],
    },
    {
      label:   'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
      ],
    },
    {
      label:   'History',
      submenu: [
        {
          label: 'Show All History', accelerator: 'CmdOrCtrl+Y', click () {
          m.create('kitsune://history')
        },
        },
        {type: 'separator'},
      ],
    },
    {
      role:    'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'},
        {type: 'separator'},
        {
          label: 'Downloads', accelerator: 'CmdOrCtrl+Shift+J', click () {
          // m.create('kitsune://downloads')
          m.create('http://localhost:4200')
        },
        },
      ],
    },
    {
      role:    'help',
      submenu: [
        {
          label: 'Learn More',
          click () {
            require('electron').
              shell.
              openExternal('https://electron.atom.io')
          },
        },
        {
          role: 'toggledevtools',
        },
      ],
    },
  ]
  if (process.platform === 'darwin') {
    template.unshift({
      label:   app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'},
      ],
    })

    // Edit menu
    template[2].submenu.push(
      {type: 'separator'},
      {
        label:   'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'},
        ],
      },
    )

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'},
    ]
  }
  return Menu.buildFromTemplate(template)
}