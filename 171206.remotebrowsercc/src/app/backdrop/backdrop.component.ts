import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css']
})
export class BackdropComponent implements OnInit {
  active: boolean = false

  constructor() {
  }

  show() {
    this.active = true
  }

  hide() {
    this.active = false
  }

  ngOnInit() {
    // setTimeout(() => this.layer.show(), 1000)
    // setInterval(() => this.active = true, 3000)
    // setInterval(() => this.active = false, 2000)
  }

}
