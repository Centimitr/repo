import {remote} from 'electron'
import {kit} from "./kit"

let {BrowserWindow} = remote

class View {
    w = new BrowserWindow({
        // show: false,
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false,
            webgl: false,
            webaudio: false
        }
    })

    constructor(private v: Vendor) {
    }

    async load(url: string) {
        this.w.loadURL(url)
        this.w.webContents.openDevTools()
        await new Promise<void>(resolve => (<any>this.w.webContents).once('dom-ready', resolve))
        await this.w.webContents.executeJavaScript(`(${kit.toString()})()`, true)
    }


    async eval(fn: string, params) {
        try {
            return await this.w.webContents.executeJavaScript(`(${fn})(window['ResourceKit'], ${JSON.stringify(params)})`, true)
        } catch (e) {
            console.warn(e, JSON.stringify(params))
        }
    }

    async evaluate(fn: Function, params) {
        // let code = `(${fn.toString()})(window['ResourceKit'])`
        // console.log(code)
        // console.log(0, JSON.stringify(params))
        try {
            return await this.w.webContents.executeJavaScript(`(${fn.toString()})(window['ResourceKit'], ${JSON.stringify(params)})`, true)
        } catch (e) {
            console.warn(e, JSON.stringify(params))
        }
    }

    release() {
        this.w.close()
        this.v.remove(this)
    }
}

class Vendor {
    views: View[] = []

    create(): View {
        let v = new View(this)
        this.views.push(v)
        return v
    }

    get(): View {
        return this.create()
    }

    remove(v: View) {
        this.views = this.views.filter(view => view != v)
    }
}

export {
    View,
    Vendor
}
