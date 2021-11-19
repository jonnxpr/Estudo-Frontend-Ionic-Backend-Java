import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../shared/material/material.module';
import { SelecaoClientesPage } from './../pages/selecao-clientes/selecao-clientes';
import { MenuPage } from './../pages/menu/menu';
import { ListPage } from './../pages/list/list';
import { ViewPersonPage } from './../pages/view-person/view-person';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from "@angular/common/http";
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewPersonPage,
    ListPage,
    MenuPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicSelectableModule,
    MaterialModule,
    SharedModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPersonPage,
    ListPage,
    MenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpServiceProvider
  ]
})
export class AppModule { }
