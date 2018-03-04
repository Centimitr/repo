/**
 * Created by Centimitr on 2016/3/17.
 */

import {Component, OnInit} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';

import {DiffService} from "./diff.service";

@Component({
  selector: 'diff',
  providers: [DiffService],
  directives: [],
  pipes: [],
  styleUrls: ['diff.css'],
  template: `<h4>{{filepath}}</h4>
<section class="info">
  <div>
    <span>Version: {{version}}</span>
    <span style="color: #333;"><</span>
    <span style="color: #666;">{{oldVersion}}</span>
  </div>
  <div>
    <span>Progress: 145/432 36.5%</span>
  </div>
</section>
<!--
  <section class="progress">
    <div *ngFor="#c of progress" class="progress-cell" [class.progress-exist]="c" [class.progress-vacant]="!c"></div>
  </section>-->
<section class="diff">
  <div class="row" *ngFor="#l of diff;#i=index">
    <div class="order">{{l.isAdded?'':l.oldOrder}}</div>
    <div class="order">{{l.isRemoved?'':l.newOrder}}</div>
    <div class="line"
         [class.unmodified]="l.isUnmodified"
         [class.added]="l.isAdded"
         [class.removed]="l.isRemoved">
      {{l.text?l.text:'&nbsp;'}}
    </div>
    <div class="line-progress" [class.line-progress-exist]="progress[i]"></div>
  </div>
</section>
  `
})

export class DiffComponent implements OnInit {
  constructor(private _diffService:DiffService) {
  }

  filepath = "diff.go";
  version = "beta.1";
  oldVersion = "beta.0";
  progress = [true,true,false,false,true,true,true,true,true,true,false,true,true,false,false,false,false]
  diff = [];

  ngOnInit() {
    this.getDiff();
  }

  getDiff() {
    this._diffService.getDiff(this.version,this.oldVersion, this.filepath)
      .subscribe(
        diff => this.diff = diff
      );
  }
}
