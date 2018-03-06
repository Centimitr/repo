import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {SpeechRecognition} from '@ionic-native/speech-recognition';

import {MyApp} from './app.component';
import {CheckPage} from "../pages/check/check";
import {ListenService} from '../providers/listen-service/listen-service';

@NgModule({
  declarations: [
    MyApp,
    CheckPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    ListenService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
