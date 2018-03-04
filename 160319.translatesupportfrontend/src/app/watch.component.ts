/**
 * Created by Centimitr on 2016/3/17.
 */

import {Component, OnInit} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {DiffComponent} from "./diff.component";
import {DiffService} from "./diff.service";
import {WatchService} from "./watch.service";

@Component({
  selector: 'watch',
  providers: [WatchService, DiffService],
  directives: [DiffComponent],
  pipes: [],
  styleUrls: ['command-list.css', 'sidebar.css'],
  template: `<section class="col-md-3">
  <!--<h4>Watch list</h4>-->
  <div><input class="form-control" type="text" [(ngModel)]="filepath"></div>
  <div class="sidebar-group">
    <div class="sidebar-title">Actions</div>
    <ul class="command-list">
      <li><a (click)="addWatch();">Add watch</a></li>
      <li><a (click)="removeWatch();">Remove watch</a></li>
    </ul>
  </div>
  <div class="sidebar-group">
    <div class="sidebar-title">Watching files</div>
    <ul class="command-list">
      <!--<li *ngFor="#w of watches"><a [style.color]="'black'">{{w.name}}</a><span>{{w.progress}}</span></li>-->
      <li *ngFor="#w of watches"><a [style.color]="'#666'" [style.font-size]="'15px'">{{w}}</a></li>
    </ul>
  </div>
  <div style="position: fixed;bottom: 12px;cursor: pointer;color: #0275de;">
    Back to Top
  </div>
</section>
<diff class="col-md-9"></diff>`
})
export class WatchComponent implements OnInit {
  constructor(private _watchService:WatchService,private _params:RouteParams) {
    this.version = _params.get('version')
  }

  version = '';
  filepath = '1.txt';
  watches = <string[]>[];

  ngOnInit() {
    this.getWatches();
  }
  getWatches() {
    if (this.version!==''){
      this._watchService.getWatches(this.version)
        .subscribe(
          watches => this.watches = <string[]>watches
        );
    }
  }
  addWatch() {
    if (this.filepath!==''){
      this._watchService.addWatch(this.version, this.filepath)
        .subscribe(
          watches => this.watches = <string[]>watches
        );
    }
  }
  removeWatch() {
    if (this.filepath!==''){
      this._watchService.removeWatch(this.version, this.filepath)
        .subscribe(
          watches => this.watches = <string[]>watches
        );
    }
  }
}
