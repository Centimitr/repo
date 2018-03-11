import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';

import {AppRoutingModule} from './app-routing.module';

import {ElectronService} from './providers/electron.service';
import {ResourceService} from "./providers/resource.service";
import {DetailComponent} from "./components/detail/detail.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [ElectronService, ResourceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
