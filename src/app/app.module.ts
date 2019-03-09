import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { MainComponent } from './main/main.component';
import { IndexComponent } from './components/index/index.component';
import { federation_server } from 'app/shared/app.tokens';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    IconSymbolComponent,
    MainComponent,
    IndexComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    // FederationGuard,
    AuthService,
    {
      provide: federation_server,
      useValue: 'federation-server'
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
