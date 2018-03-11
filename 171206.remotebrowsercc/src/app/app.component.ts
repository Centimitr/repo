import {
  AfterViewInit, Component, NgZone, ViewChild
} from '@angular/core';
import {PointerLayerComponent} from "./pointer-layer/pointer-layer.component";
import {RemoteService} from "./services/remote.service";
import {WindowService} from "./services/window.service";
import {BackdropComponent} from "./backdrop/backdrop.component";
import {LocationLayerComponent} from "./location-layer/location-layer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(PointerLayerComponent) pointer: PointerLayerComponent
  @ViewChild(LocationLayerComponent) location: LocationLayerComponent
  @ViewChild(BackdropComponent) backdrop: BackdropComponent


  constructor(private rs: RemoteService, private ws: WindowService, private zone: NgZone) {
    rs.connect('ws://10.0.0.23:6138').then(() =>
      rs.send('Hello')
    )
  }

  toggleLayer(name?: string) {
    const layers = ['location']
    const hideAll = () => layers.forEach(name => this[name].hide())
    const needHideAll = !layers.includes(name)
    if (needHideAll) {
      hideAll()
      this.backdrop.hide()
    }
    else {
      this.backdrop.show()
      const current = this[name]
      this.rs.send(name + ' ' + current.active)
      if (current.active) {
        current.hide()
        this.backdrop.hide()
      } else {
        hideAll()
        current.show()
      }
    }

  }

  ngAfterViewInit() {
    this.rs.listen(data => {
      const method = data[0]
      const params = data.slice(1)
      switch (method) {
        case 'switch':
          // todo: switch view
          this.toggleLayer('location')
          // this.ws.switch()
          break
        case 'location':
          // todo: location view
          this.toggleLayer('location')
          // this.ws.location().then()
          break
        case 'close':
          this.ws.close().then()
          break
        case 'move':
          const [x, y, w, h] = params
          this.ws.pointer.move(x, y, w, h)
          break
        case 'new':
          this.ws.new().then()
          break
        case 'input':
          this.ws.input(params[0]).then()
          break
      }
    })
  }
}
