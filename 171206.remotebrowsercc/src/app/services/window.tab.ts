import {LocalService} from "./local.service";
import * as uuid from 'uuid/v4';


export class Tab {
  id: string = uuid()

  constructor(private ls: LocalService) {
  }

  private data(data: any) {
    return {
      id: this.id,
      data
    }
  }

  async init() {
    await this.ls.call('new', this.data(null))
  }

  async switch() {
    await this.ls.call('switch', this.data(null))
  }

  async load(url: string) {
    await this.ls.call('load', this.data(url))
  }

  async close() {
    await this.ls.call('close', this.data(null))
  }

  async eval(js: string) {
    await this.ls.call('eval', this.data(js))
  }

  async input(e: string, x?: number, y?: number) {
    // language=JavaScript
    const dispatch = `(function (e, x, y) {
      (function () {
        class ActiveHighlight {
          constructor() {
            const hl = document.createElement('div')
            hl.id = 'cmb'
            hl.style.position = 'fixed'
            hl.style.background = 'rgba(0, 0, 0, .2)'
            hl.style.borderRadius = '4px'
            hl.style.display = 'hidden'
            hl.style.zIndex = '1000000000'
            document.body.appendChild(hl)
            console.log(hl)
            this.hl = hl
          }

          highlight(elm) {
            this.hl.style.height = elm.style.clientHeight
            this.hl.style.width = elm.style.clientWidth
            this.hl.style.top = elm.style.clientTop
            this.hl.style.left = elm.style.clientLeft
            this.hl.style.display = 'block'
          }

          cancel() {
            this.hl.style.display = 'hidden'
          }
        }

        class SmoothScroll {
          scrollableElementFromPoint(x, y) {
            const isScrollableElement = function (elm) {
              const style = window.getComputedStyle(elm)
              const isOverflowHidden = style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden'
              // || ['absolute', 'fixed'].includes(style.position)
              return (elm.scrollHeight > elm.offsetHeight) && !isOverflowHidden
            }
            let elm = document.elementFromPoint(x, y)
            while (elm && !isScrollableElement(elm)) {
              elm = elm.parentElement
            }
            return elm || document.body
          }

          scroll(x, y, e) {
            const slm = this.scrollableElementFromPoint(x, y)
            slm.scrollTop += e.deltaY
            slm.scrollWidth += e.deltaX
          }
        }

        class RemoteBrowserKit {

          constructor() {
            this.activeHightlight = new ActiveHighlight()
            this.smoothScroll = new SmoothScroll()
          }

          generateEvent(e, x, y) {
            const eToKeyboardEvent = function (e) {
              return new KeyboardEvent(e.type, {
                view: window,
                bubbles: true,
                cancelable: true,
                code: e.code,
                key: e.key,
                // location ? : number;
                // repeat : e. ,
                altKey: e.modifiers.includes('alt'),
                ctrlKey: e.modifiers.includes('control'),
                metaKey: e.modifiers.includes('meta'),
                shiftKey: e.modifiers.includes('shift')
              })
            }
            const eToMouseEvent = function (e, x, y) {
              return new MouseEvent(e.type, {
                view: window,
                bubbles: true,
                cancelable: true,
                button: ({left: 0, middle: 1, right: 2})[e.button],
                buttons: ({left: 1, middle: 4, right: 2})[e.button] || 0,
                clientX: x,
                clientY: y,
                // relatedTarget?: EventTarget | null;
                // screenX?: number;
                // screenY?: number;
                altKey: e.modifiers.includes('alt'),
                ctrlKey: e.modifiers.includes('control'),
                metaKey: e.modifiers.includes('meta'),
                shiftKey: e.modifiers.includes('shift')
              })
            }
            const eToWheelEvent = function (e, x, y) {
              return new WheelEvent('wheel', {
                clientX: x,
                clientY: y,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                deltaZ: e.deltaZ,
                deltaMode: e.deltaMode
              })
            }
            // keyboard, mouse
            if (e.type.startsWith('key')) return eToKeyboardEvent(e)
            else if (e.type.startsWith('mouse') || e.type === 'click') return eToMouseEvent(e, x, y)
            else if (e.type.startsWith('wheel')) return eToWheelEvent(e, x, y)
            else return null
          }
        }

        window.cmkit = new RemoteBrowserKit()
      })()
      console.log("Start")
      const kit = window.cmkit
      if (!kit) return
      const event = kit.generateEvent(e, x, y)
      // let needDispatch = true
      // const eToKeyboardEvent = function (e) {
      //   return new KeyboardEvent(e.type, {
      //     view: window,
      //     bubbles: true,
      //     cancelable: true,
      //     code: e.code,
      //     key: e.key,
      //     // location ? : number;
      //     // repeat : e. ,
      //     altKey: e.modifiers.includes('alt'),
      //     ctrlKey: e.modifiers.includes('control'),
      //     metaKey: e.modifiers.includes('meta'),
      //     shiftKey: e.modifiers.includes('shift')
      //   })
      // }
      // const eToMouseEvent = function (e, x, y) {
      //   return new MouseEvent(e.type, {
      //     view: window,
      //     bubbles: true,
      //     cancelable: true,
      //     button: ({left: 0, middle: 1, right: 2})[e.button],
      //     buttons: ({left: 1, middle: 4, right: 2})[e.button] || 0,
      //     clientX: x,
      //     clientY: y,
      //     // relatedTarget?: EventTarget | null;
      //     // screenX?: number;
      //     // screenY?: number;
      //     altKey: e.modifiers.includes('alt'),
      //     ctrlKey: e.modifiers.includes('control'),
      //     metaKey: e.modifiers.includes('meta'),
      //     shiftKey: e.modifiers.includes('shift')
      //   })
      // }
      // const eToWheelEvent = function (e, x, y) {
      //   return new WheelEvent('wheel', {
      //     clientX: x,
      //     clientY: y,
      //     deltaX: e.deltaX,
      //     deltaY: e.deltaY,
      //     deltaZ: e.deltaZ,
      //     deltaMode: e.deltaMode
      //   })
      // }
      // // keyboard, mouse
      // if (e.type.startsWith('key')) event = eToKeyboardEvent(e)
      // else if (e.type.startsWith('mouse') || e.type === 'click') event = eToMouseEvent(e, x, y)
      // else needDispatch = false
      const elm = document.elementFromPoint(x, y)
      if (event) {
        elm.focus()
        elm.dispatchEvent(event)
      }
      // mousedown, mouseup
      if (e.type === 'mousedown') {
        kit.activeHightlight.highlight(elm)
      } else if (e.type === 'mouseup') {
        kit.activeHightlight.cancel()
      }
      // wheel
      if (e.type.startsWith('wheel')) {
        // event = eToWheelEvent(e, x, y)
        // const scrollableElementFromPoint = function (x, y) {
        //   const isScrollableElement = function (elm) {
        //     const style = window.getComputedStyle(elm)
        //     const isOverflowHidden = style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden'
        //     // || ['absolute', 'fixed'].includes(style.position)
        //     return (elm.scrollHeight > elm.offsetHeight) && !isOverflowHidden
        //   }
        //   let elm = document.elementFromPoint(x, y)
        //   while (elm && !isScrollableElement(elm)) {
        //     elm = elm.parentElement
        //   }
        //   return elm || document.body
        // }
        // const slm = scrollableElementFromPoint(x, y)
        // slm.scrollTop += event.deltaY
        // slm.scrollWidth += event.deltaX
        kit.smoothScroll.scroll(x, y, e)
      }
    })`
    const script = `(${dispatch})(${e}, ${x}, ${y})`
    await this.ls.call('eval', this.data(script))
  }
}


// // wheel compare fn
// let elm = document.elementFromPoint(x, y)
// const compare = function (vfn, fn, vfn2) {
//   const old = JSON.stringify(vfn())
//   fn()
//   const newValue = JSON.stringify(vfn2())
//   console.log(old, newValue)
//   return old === newValue
// }
// const vfn = () => ([elm.scrollWidth, elm.scrollHeight])
// while (1) {
//   const changedX = compare(vfn, () => elm.scrollWidth += event.deltaX, vfn)
//   const changedY = compare(vfn, () => elm.scrollHeight += event.deltaY, vfn)
//   if (changedX || changedY) {
//     break
//   }
//   elm = elm.parentElement
//   console.log(elm)
//   if (!elm) {
//     elm = document.body
//     elm.scrollWidth += event.deltaX
//     elm.scrollHeight += event.deltaY
//     break
//   }
// }
