import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
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
import { ProfileModalComponent } from './components/index/profile-modal/profile-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PwdModalComponent } from './components/index/pwd-modal/pwd-modal.component';
import { InvitationModalComponent } from './components/index/invitation-modal/invitation-modal.component';

import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    IconSymbolComponent,
    MainComponent,
    IndexComponent,
    ProfileModalComponent,
    NotFoundComponent,
    PwdModalComponent,
    InvitationModalComponent,
  ],
  entryComponents: [
    ProfileModalComponent,
    PwdModalComponent,
    InvitationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService, 
    I18nLangService, 
    TranslateService,
    AuthService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
