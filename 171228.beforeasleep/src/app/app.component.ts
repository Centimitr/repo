import {AfterViewInit, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CheckPage} from "../pages/check/check";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit {

  @ViewChild(CheckPage) public check: CheckPage

  list = [
    {icon: 'heart', iconColor: 'red', name: 'Add New Habit'},
    {icon: 'calendar', iconColor: 'orange', name: 'Current Plan'},
    // {icon: 'settings', iconColor: '#444', name: 'Settings'}
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()
    });
  }

  startCheck() {
    console.log(1)
    this.check.activate().then()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.check.activate().then()
    }, 0)
  }

}

