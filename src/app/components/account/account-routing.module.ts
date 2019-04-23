import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateDeactivator, TranslateResolver, TranslateToken } from 'app/i18n';

import {LoginComponent} from './login/login.component';
import {ResetComponent} from './reset/reset.component';

const accountRoutes: Routes = [
  {
    path: '',
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'reset-pwd',
        component: ResetComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'account',
    },
  ],
})
export class AccountRoutingModule { }
