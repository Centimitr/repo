import {Injectable} from '@angular/core';

@Injectable()
export class LocalService {

  private cnt = 0
  private map = new Map<string, Function>()
  private timeout = 10 * 1000
  private sends = 0
  private receives = 0

  constructor() {
    window['_remotebrowser_response'] = (id, data) => {
      const res = JSON.parse(data)
      const resolveFn = this.map.get(id)
      if (resolveFn) {
        resolveFn(res)
        this.receives++
      }
    }
  }

  private send(name: string, id: string, content: string) {
    try {
      console.log("SEND:", id)
      const handlers = window['webkit'].messageHandlers
      const handler = handlers[name]
      handler.postMessage(`${id} |REMOTEBROWSER.MESSAGE| ${content}`)
      this.sends++
    } catch (e) {
      console.warn(100, e)
    }
  }

  async call(name: string, data: any) {
    return new Promise<void>((resolve, reject) => {
      this.cnt++
      const id = name + this.cnt
      this.map.set(id, resolve)
      this.send(name, id, JSON.stringify(data))
      resolve()
      setTimeout(() => {
        this.map.delete(id)
        reject('timeout')
      }, this.timeout)
    })
  }
}
