/**
 * Created by Centimitr on 2016/3/17.
 */

import {Component, OnInit} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';

@Component({
  selector: 'init',
  providers: [],
  directives: [],
  pipes: [],
  styleUrls: [],
  template: `
      <h4>Init</h4>
    <button class="btn btn-secondary">Set source lang</button>
    <button class="btn btn-secondary">Set target lang</button>
  `
})

export class InitComponent implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }
}
