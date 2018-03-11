import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {PointerLayerComponent} from './pointer-layer/pointer-layer.component';
import {RemoteService} from "./services/remote.service";
import {WindowService} from "./services/window.service";
import {LocalService} from "./services/local.service";
import { BackdropComponent } from './backdrop/backdrop.component';
import { LocationLayerComponent } from './location-layer/location-layer.component';


@NgModule({
  declarations: [
    AppComponent,
    PointerLayerComponent,
    BackdropComponent,
    LocationLayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RemoteService, LocalService, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
