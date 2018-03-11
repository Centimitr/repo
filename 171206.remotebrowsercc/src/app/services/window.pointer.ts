export class Pointer {
  x: number = 0
  y: number = 0
  private cw: number
  private ch: number
  private cb: Function = () => 0

  setRange(w: number, h: number) {
    this.cw = w
    this.ch = h
  }

  move(sx: number, sy: number, sw: number, sh: number) {
    // sw *= .8
    // sh *= .8
    const scale = Math.min(sw / this.cw, sh / this.ch)
    const [iw, ih] = [this.cw * scale, this.ch * scale]
    const calcCenterRange = function (outer, inner) {
      const min = (outer - inner) / 2
      const max = outer - min
      return {min, max}
    }
    const makeInRange = function (value, range) {
      if (value < range.min) return range.min
      else if (value > range.max) return range.max
      else return value
    }
    const sxRange = calcCenterRange(sw, iw)
    const syRange = calcCenterRange(sh, ih)
    const ix = makeInRange(sx, sxRange) - ((sw - iw) / 2)
    const iy = makeInRange(sy, syRange) - ((sh - ih) / 2)
    this.x = Math.floor(ix / scale)
    this.y = Math.floor(iy / scale)
    this.cb(this.x, this.y)
  }

  listen(fn: Function) {
    this.cb = fn
  }
}
