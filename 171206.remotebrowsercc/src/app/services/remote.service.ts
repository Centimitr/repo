import {Injectable} from '@angular/core';

@Injectable()
export class RemoteService {

  private socket: WebSocket
  private listenCb: Function = () => 0

  constructor() {
  }

  async connect(address: string) {
    this.socket = new WebSocket(address);
    this.socket.addEventListener('message', event => this.listenCb(JSON.parse(event.data), event));
    return new Promise(resolve => {
      this.socket.addEventListener('open', event => resolve(event))
    })
  }

  send(content: string) {
    if (this.socket) {
      this.socket.send(content)
    }
  }

  debug(content: any) {
    return this.send(JSON.stringify({
      debug: true,
      content: content
    }))
  }

  listen(cb: Function) {
    this.listenCb = cb
  }

}
