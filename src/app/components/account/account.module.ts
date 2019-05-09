import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { I18nModule } from 'app/i18n';
import { SharedModule } from 'app/shared';
import { federation_server } from 'app/shared/app.tokens';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
// import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    LoginComponent,
    ResetComponent,
    // AccountComponent,
  ],
  providers: [
    {
      provide: federation_server,
      useValue: 'federation-server'
    }
  ]
})
export class AccountModule { }
