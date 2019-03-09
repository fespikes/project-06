import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
  ApiService,
  AuthService,
  FederationGuard,
} from './services';

import { TuiMessageService  } from 'tdc-ui';
import { TuiModule, FormModule } from 'tdc-ui';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TuiModule,
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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
