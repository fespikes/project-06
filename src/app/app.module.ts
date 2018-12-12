import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  I18nModule,
  I18nLangService,
  TranslateService,
} from './i18n';

import { ApiService, SharedModule, FederationGuard, AuthService }  from 'app/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconSymbolComponent } from 'assets/icons/icon-symbol.component';

import { LoginMainComponent } from './login-main/login-main.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    IconSymbolComponent,
    MainComponent,
    LoginMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    I18nModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ 
    ApiService, 
    I18nLangService, 
    TranslateService,
    FederationGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
