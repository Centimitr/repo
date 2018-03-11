import {Injectable} from '@angular/core';
import {LocalService} from "./local.service";
import {Tab} from "./window.tab";
import {Pointer} from "./window.pointer";

@Injectable()
export class WindowService {

  constructor(private ls: LocalService) {
    this.closeAll().then()
  }

  defaultPageUrl = 'https://www.google.com/'
  private tabs: Tab[] = []
  private current: Tab
  pointer = new Pointer()

  test() {
    console.log(this.tabs)
  }

  async new(foreground: boolean = true) {
    const t = new Tab(this.ls)
    await t.init()
    this.tabs.push(t)
    if (foreground) await this.switch(t)
    await t.load(this.defaultPageUrl).then()
  }

  async switch(tab: Tab) {
    this.current = tab
    await tab.switch()
  }

  private async cur(cb: (Tab) => void) {
    const tab = this.current
    if (tab) await cb(tab)
  }

  async close() {
    await this.cur(async tab => {
      await tab.close()
      this.tabs = this.tabs.filter(t => t != tab)
    })
    if (this.tabs.length) {
      await this.switch(this.tabs[this.tabs.length - 1])
    } else {
      await this.new()
    }
  }

  async load(url: string) {
    await this.cur(async tab => await tab.load(url))
  }

  async eval(js: string) {
    return await this.cur(async tab => await tab.eval(js))
  }

  async input(e: string) {
    await this.cur(async tab => await tab.input(e, this.pointer.x, this.pointer.y))
  }

  async closeAll() {
    this.tabs = [];
    await this.ls.call('closeAll', {id: null, data: null})
    await this.new()
  }
}
