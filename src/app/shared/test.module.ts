import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, TranslateService } from '../i18n';
import { HttpClientModule } from '@angular/common/http';

import { 
  ApiService,
  AuthService,
  FederationGuard,
} from './services';

// import {
//   FileUploadDirective,
//   ForbiddenUsernameDirective,
//   ForbiddenEmailDirective,
// } from 'app/shared/directives';

import { TuiMessageService  } from 'tdc-ui';
import { TuiModule, FormModule } from 'tdc-ui';

@NgModule({
  declarations: [
    // FileUploadDirective,
    // ForbiddenUsernameDirective,
    // ForbiddenEmailDirective,
  ],
  imports: [
    CommonModule,
    TuiModule,
    I18nModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthService,
    FederationGuard,
    TuiMessageService,
    TranslateService
  ],
  exports: [
    TuiModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TestModule { }
