import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {WindowService} from "../services/window.service";

@Component({
  selector: 'app-pointer-layer',
  templateUrl: './pointer-layer.component.html',
  styleUrls: ['./pointer-layer.component.css']
})
export class PointerLayerComponent implements OnInit {
  private top = 0;
  private left = 0;
  private show = true;
  // private show = false;
  // private active = false;
  // private hideCountDown = new Countdown(10 * 1000);

  constructor(private elm: ElementRef, private ws: WindowService) {
    // this.hideCountDown.didStartCb(() => this.show = true);
    // this.hideCountDown.didFinishCb(() => this.show = false);
  }

  ngOnInit() {
    this.ws.pointer.setRange(this.elm.nativeElement.clientWidth, this.elm.nativeElement.clientHeight)
    this.ws.pointer.listen((x, y) => this.move(x, y))
  }

  move(x: number, y: number) {
    this.left = x
    this.top = y
  }

}

class Countdown {
  timer: any;

  constructor(private timeout: number) {
  }

  clear() {
    clearTimeout(this.timer);
  }

  start() {
    this.clear();
    this.didStartCb();
    this.timer = setTimeout(() => {
      this.didFinishCb();
    }, this.timeout);
  }

  didStartCb: Function = () => 0;

  didStart(cb: Function) {
    this.didStartCb = cb;
  }

  didFinishCb: Function = () => 0;

  didFinish(cb: Function) {
    this.didFinishCb = cb;
  }
}

//
// private moveMapMethod = 'equal'
//
// // private moveMapMethod = 'scale'
//
// move(sx: number, sy: number, sw: number, sh: number) {
//   // const within = function (innerW, innerH, outerW, outerH, x, y) {
//   //   const leftOffset = (outerW - innerW) / 2
//   //   const topOffset = (outerH - innerH) / 2
//   //   const xScale = outerW / innerW
//   //   const yScale = outerH / innerH
//   //   return [x / xScale + leftOffset, y / yScale + topOffset]
//   // }
//   this.hideCountDown.start()
//   const [cw, ch] = [this.elm.nativeElement.clientWidth, this.elm.nativeElement.clientHeight]
//   sw *= .8
//   sh *= .8
//   const scale = Math.min(sw / cw, sh / ch) * 0.8
//   const [iw, ih] = [cw * scale, ch * scale]
//   const calcCenterRange = function (outer, inner) {
//     const min = (outer - inner) / 2
//     const max = outer - min
//     return {min, max}
//   }
//   const makeInRange = function (value, range) {
//     if (value < range.min) return range.min
//     else if (value > range.max) return range.max
//     else return value
//   }
//   const sxRange = calcCenterRange(sw, iw)
//   const syRange = calcCenterRange(sh, ih)
//   const ix = makeInRange(sx, sxRange) - ((sw - iw) / 2)
//   const iy = makeInRange(sy, syRange) - ((sh - ih) / 2)
//   this.left = ix / scale
//   this.top = iy / scale
//   // this.rs.debug({
//   //   sxRange, syRange, ix, iy,
//   //   left: this.left,
//   //   top: this.top
//   // })
//   //
//   // const p0 = {
//   //   x: sx - sw / 2,
//   //   y: -sy + sh / 2
//   // }
//   // const k = p0.y / p0.x
//   // const ps = [
//   //   {x: iw / 2, y: k * (iw / 2)},
//   //   {x: -iw / 2, y: k * (-iw / 2)},
//   //   {y: ih / 2, x: (ih / 2) / k},
//   //   {y: -ih / 2, x: (-ih / 2) / k},
//   // ]
//   // let p1
//   // if (
//   //   -iw / 2 <= p0.x && p0.x <= iw / 2 &&
//   //   -ih / 2 <= p0.y && p0.y <= ih / 2) {
//   //   p1 = p0
//   // } else {
//   //   p1 = ps
//   //     .filter(p => p.x <= iw / 2)
//   //     .filter(p => p.x >= -iw / 2)
//   //     .filter(p => p.y <= ih / 2)
//   //     .filter(p => p.y >= -ih / 2)
//   //     .filter(p => p.x * p0.x >= 0)
//   //     .filter(p => p.y * p0.y >= 0)
//   //     [0]
//   //
//   // }
//   // const p2 = {x: p1.x / scale, y: p1.y / scale}
//   // this.left = p2.x + cw / 2
//   // this.top = -p2.y + ch / 2
//   // // console.log(this.top, this.left)
//   // this.rs.debug({
//   //   originalArea: `${sw} X ${sh}`,
//   //   originalPoint: `(${sx}, ${sy})`,
//   //   transformArea: `${iw} X ${ih}`,
//   //   p0: `(${p0.x}, ${p0.y})`,
//   //   k,
//   //   p1: `(${p1.x}, ${p1.y})`,
//   //   p2: `(${p2.x}, ${p2.y})`,
//   //   left: this.left,
//   //   top: this.top
//   // })
// }
