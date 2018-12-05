import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  I18nModule,
  I18nLangService,
  TranslateService,
} from './i18n';

import { ApiService, SharedModule }  from './shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginMainComponent} from './login-main/login-main.component';
import { IconSymbolComponent } from 'assets/icons/icon-symbol.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginMainComponent,
    IconSymbolComponent,
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
    TranslateService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
