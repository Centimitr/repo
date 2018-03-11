import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-location-layer',
  templateUrl: './location-layer.component.html',
  styleUrls: ['./location-layer.component.css']
})
export class LocationLayerComponent implements OnInit {

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
  }

}
