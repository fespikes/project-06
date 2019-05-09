import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import {ClipboardModule} from 'ngx-clipboard';

import { of } from 'rxjs';
import { TuiModalService} from 'tdc-ui';

import { I18nModule, TranslateService, I18nLangService } from '../i18n';
import { TranslatePipeStub, DefaultPipeStub } from 'app/mock';
import {
  ApiService,
  AuthService,
  FederationGuard,
} from './services';
import { AuthServiceStub } from 'app/shared/services/auth.service.stub';
import { ApiServiceStub } from 'app/shared/services/api.service.stub';

import {
  TuiMessageService,
  TuiModule,
  FormModule,
} from 'tdc-ui';

export class TuiModalServiceStub {
  open() {
    return of();
  }
}

export class I18nLangServiceStub {
  current = of('zh_CN');
}

@NgModule({
  declarations: [
    DefaultPipeStub,
    TranslatePipeStub
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterTestingModule,

    // TuiModule,
    // I18nModule,
    // FormModule,
    // ClipboardModule,
    // BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    TuiMessageService,
    {
      provide: I18nLangService,
      useClass: I18nLangServiceStub,
    },
    // {
    //   provide: ApiService,
    //   useClass: ApiServiceStub,
    // },
    // // AuthService,
    // {
    //   provide: AuthService,
    //   useClass: AuthServiceStub,
    // },
    // FederationGuard,
    // TuiMessageService,
    {
      provide: TranslateService,
      useValue: {
        get() {
          return of();
        },
        translateKey() {},
        onLangChange: {
          subscribe: () => {}
        }
      }
    },
    {
      provide: TuiModalService,
      useClass: TuiModalServiceStub
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
    // CommonModule,
    RouterTestingModule,
    HttpClientModule,
    OverlayModule
  ]
})
export class TestModule { }
