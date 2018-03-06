function createContextMenu (win, opts) {
  const webContents = win => win.webContents || win.getWebContents()
  webContents(win).on('context-menu', (e, props) => {
    if (typeof opts.shouldShowMenu === 'function' &&
      opts.shouldShowMenu(e, props) === false) {
      return
    }

    const editFlags = props.editFlags
    const hasText = props.selectionText.trim().length > 0
    const can = type => editFlags[`can${type}`] && hasText

    let menuTpl = [
      {
        type: 'separator',
      }, {
        id:      'cut',
        label:   'Cut',
        // Needed because of macOS limitation:
        // https://github.com/electron/electron/issues/5860
        role:    can('Cut') ? 'cut' : '',
        enabled: can('Cut'),
        visible: props.isEditable,
      }, {
        id:      'copy',
        label:   'Copy',
        role:    can('Copy') ? 'copy' : '',
        enabled: can('Copy'),
        visible: props.isEditable || hasText,
      }, {
        id:      'paste',
        label:   'Paste',
        role:    editFlags.canPaste ? 'paste' : '',
        enabled: editFlags.canPaste,
        visible: props.isEditable,
      }, {
        type: 'separator',
      }]

    if (props.mediaType === 'image') {
      menuTpl = [
        {
          type: 'separator',
        }, {
          id:    'save',
          label: 'Save Image',
          click () {
            download(win, props.srcURL)
          },
        }, {
          type: 'separator',
        }]
    }

    if (props.linkURL && props.mediaType === 'none') {
      menuTpl = [
        {
          type: 'separator',
        }, {
          id:    'copyLink',
          label: 'Copy Link',
          click () {
            if (process.platform === 'darwin') {
              electron.clipboard.writeBookmark(props.linkText, props.linkURL)
            } else {
              electron.clipboard.writeText(props.linkURL)
            }
          },
        }, {
          type: 'separator',
        }]
    }

    if (opts.prepend) {
      const result = opts.prepend(props, win)

      if (Array.isArray(result)) {
        menuTpl.unshift(...result)
      }
    }

    if (opts.append) {
      const result = opts.append(props, win)

      if (Array.isArray(result)) {
        menuTpl.push(...result)
      }
    }

    // isDev temp
    const isDev = true
    if (opts.showInspectElement ||
      (opts.showInspectElement !== false && isDev)) {
      menuTpl.push({
        type: 'separator',
      }, {
        id:    'inspect',
        label: 'Inspect Element',
        click () {
          win.inspectElement(props.x, props.y)

          if (webContents(win).isDevToolsOpened()) {
            webContents(win).devToolsWebContents.focus()
          }
        },
      }, {
        type: 'separator',
      })
    }

    // Apply custom labels for default menu items
    if (opts.labels) {
      for (const menuItem of menuTpl) {
        if (opts.labels[menuItem.id]) {
          menuItem.label = opts.labels[menuItem.id]
        }
      }
    }

    // Filter out leading/trailing separators
    // TODO: https://github.com/electron/electron/issues/5869
    function delUnusedElements (menuTpl) {
      let notDeletedPrevEl
      return menuTpl.filter(el => el.visible !== false).filter((el, i, arr) => {
        const toDelete = el.type === 'separator' &&
          (!notDeletedPrevEl || i === arr.length - 1 || arr[i + 1].type ===
            'separator')
        notDeletedPrevEl = toDelete ? notDeletedPrevEl : el
        return !toDelete
      })
    }

    menuTpl = delUnusedElements(menuTpl)

    if (menuTpl.length > 0) {
      const menu = (electron.remote
        ? electron.remote.Menu
        : electron.Menu).buildFromTemplate(menuTpl)
      menu.popup(electron.remote ? electron.remote.getCurrentWindow() : win)
    }
  })
}

const path = require('path')
const url = require('url')
const electron = require('electron')
const {app, BrowserWindow, Menu, webContents} = electron

class LocationWindowManager {
  constructor () {}

  show (p) {
    if (!this.w || this.w.isDestroyed()) {
      const w = new BrowserWindow({
        modal:       true,
        parent:      p,
        width:       480,
        height:      320,
        resizable:   false,
        transparent: true,
        show:        false,
      })
      w.loadURL('kitsune://location')
      w.once('ready-to-show', w.show)
      this.w = w
    }
  }
}

class WindowManager {
  constructor () {
    this.m = new Map()
    this.location = new LocationWindowManager(this)
  }

  push (w) {
    const k = Date.now()
    this.m.set(k, w)
    return k
  }

  len () {
    return this.m.size
  }

  empty () {
    return this.len() === 0
  }

  remove (k) {
    this.m.delete(k)
  }

  create (optionalUrl) {
    const url = optionalUrl || 'kitsune://index'
    const contents = webContents.getAllWebContents()
    const urls = contents.map(w => w.getURL())
    const map = require('./url').map
    const index = urls.map(u => map(u)).indexOf(map(url) + '.html')
    if (url.startsWith('kitsune') && index >= 0) {
      contents[index].focus()
    } else {
      const size = require('electron').screen.getPrimaryDisplay().workAreaSize
      const wh = Math.floor(size.height * 0.8), ww = Math.floor(wh / 0.68)
      const showAtOnce = !this.empty()
      const w = new BrowserWindow({
        width:             ww,
        height:            wh,
        minWidth:          480,
        minHeight:         320,
        title:             '',
        tabbingIdentifier: 'a',
        show:              showAtOnce,
      })
      if (!showAtOnce) {
        w.once('ready-to-show', w.show)
      }

      // createContextMenu(w, {})
      w.loadURL(url)

      const k = this.push(w)
      w.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        this.create(url)
      })
      w.on('closed', () => this.remove(k))
    }
  }
}

module.exports = {
  manager: new WindowManager(),
}
