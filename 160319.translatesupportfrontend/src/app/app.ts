/*
 * Angular 2 decorators and services
 */
import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {DiffComponent} from "./diff.component";
import {InitComponent} from "./init.component";
import {WatchComponent} from "./watch.component";
import {VersionComponent} from "./version.component";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, RouterActive, InitComponent,VersionComponent,WatchComponent,DiffComponent],
  pipes: [],
  styleUrls: ['diff.css'],
  template: `<header>
  <nav class="navbar navbar-light bg-faded">
    <div class="nav navbar-nav container">
      <!--<a class="nav-item nav-link" [routerLink]=" ['Init'] ">Init</a>-->
      <a class="nav-item nav-link" [routerLink]=" ['Version'] ">Version</a>
      <!--<a class="nav-item nav-link" [routerLink]=" ['Watch'] ">Watch</a>-->
    </div>
  </nav>
</header>

<main class="container">
  <br>
  <router-outlet></router-outlet>
</main>

<footer>
</footer>
  `
})
@RouteConfig([
  // {path: '/init', component: InitComponent, name: 'Init'},
  {path: '/version', component: VersionComponent, name: 'Version'},
  {path: '/version/:version/watch', component: WatchComponent, name: 'Watch'},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  //{path: '/about', loader: () => require('es6-promise!./about/about')('About'), name: 'About'},
  {path: '/**', redirectTo: ['Version']}
])
export class App implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
