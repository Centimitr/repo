console.log(1)
window.bbb = 1

class ActiveHighlight {
  constructor() {
    const hl = document.createElement('div')
    hl.position = 'fixed'
    hl.background = 'rgba(0, 0, 0, .2)'
    hl.borderRadius = '4px'
    hl.display = 'hidden'
    hl.zIndex = 1000000000
    document.body.appendChild(hl)
    this.hl = hl
  }

  highlight(elm) {
    this.hl.height = elm.clientHeight
    this.hl.width = elm.clientWidth
    this.hl.top = elm.clientTop
    this.hl.left = elm.clientLeft
    this.hl.display = 'block'
  }

  cancel() {
    this.hl.display = 'hidden'
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
