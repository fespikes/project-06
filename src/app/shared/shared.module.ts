import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '../i18n';

import { 
  ApiService,
  AuthService,
  FederationGuard,
} from './services';

import {
  FileUploadDirective,
  ForbiddenUsernameDirective,
  ForbiddenEmailDirective,
} from 'app/shared/directives';

import { TuiMessageService  } from 'tdc-ui';
import { TuiModule, FormModule } from 'tdc-ui';

@NgModule({
  declarations: [
    FileUploadDirective,
    ForbiddenUsernameDirective,
    ForbiddenEmailDirective,
  ],
  imports: [
    CommonModule,
    TuiModule,
    I18nModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    AuthService,
    FederationGuard,
    TuiMessageService
  ],
  exports: [
    TuiModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
