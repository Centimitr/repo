/**
 * Created by Centimitr on 2016/3/17.
 */

import {Component, OnInit} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {VersionService} from "./version.service";


@Component({
  selector: 'version',
  providers: [VersionService],
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  styleUrls: ['command-list.css', 'sidebar.css'],
  template: `<section class="col-md-3">
  <div><input class="form-control" type="text" [(ngModel)]="version"></div>
  <div class="sidebar-group">
    <div class="sidebar-title">Actions</div>
    <ul class="command-list">
      <li><a (click)="addVersion()">Add version</a></li>
      <li><a (click)="removeVersion()">Remove version</a></li>
      <!--<li><a>Set base version</a></li>-->
      <!--<li><a>Init watch</a></li>-->
      <!--<li><a>Init translate</a></li>-->
    </ul>
  </div>
  <div class="sidebar-group">
    <div class="sidebar-title">Versions</div>
    <ul class="command-list">
      <li *ngFor="#v of versions"><a [style.color]="'#666'" [style.font-size]="'15px'" [routerLink]="['/Watch',{version:v.name}]">{{v.name}}</a></li>
    </ul>
  </div>
  <div style="position: fixed;bottom: 12px;cursor: pointer;color: #0275de;">
    Back to Top
  </div>
</section>
<section class="col-md-9"></section>
  `
})
export class VersionComponent implements OnInit {
  constructor(private _versionService:VersionService) {
  }

  versions=<string[]>[];
  version='';

  ngOnInit() {
    this.getVersions();
  }
  getVersions(){
    this._versionService.getVersions()
      .subscribe(
        versions=>this.versions= <string[]>versions
      )
  }
  addVersion(){
    this._versionService.addVersion(this.version)
      .subscribe(
        versions=>this.versions= <string[]>versions
      )
  }
  removeVersion(){
    this._versionService.removeVersion(this.version)
      .subscribe(
        versions=>this.versions= <string[]>versions
      )
  }
}
