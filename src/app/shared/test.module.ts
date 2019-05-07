import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, TranslateService, I18nLangService } from '../i18n';
import { HttpClientModule } from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import {
  ApiService,
  AuthService,
  FederationGuard,
} from './services';
import { ApiServiceStub } from 'app/shared/services/api.service.stub';
import {
  TuiMessageService,
  TuiModalService,
  TuiModule,
  FormModule,
  TuiModalRef,
  TUI_MODAL_DATA,
} from 'tdc-ui';

export class TuiModalServiceStub {
  open() {
    return of();
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiModule,
    I18nModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    HttpClientModule,
    ClipboardModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: ApiService,
      useClass: ApiServiceStub,
    },
    AuthService,
    FederationGuard,
    TuiMessageService,
    {
      provide: TuiModalService,
      useClass: TuiModalServiceStub
    },
    TuiModalRef,
    TranslateService,
    I18nLangService,
    {
      provide: TUI_MODAL_DATA,
      useValue: {},
    },
  ],
  exports: [
    TuiModule,
    I18nModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterTestingModule,
    HttpClientModule
  ]
})
export class TestModule { }
