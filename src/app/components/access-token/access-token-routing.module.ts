import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateDeactivator, TranslateResolver, TranslateToken} from 'app/i18n';

import { AccessTokenComponent } from './access-token.component';

const routes: Routes = [{
  path: '',
  resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
    children: [
      {
        path: 'list',
        component: AccessTokenComponent
      },{
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'access-token'
    },
  ]
})
export class AccessTokenRoutingModule { }
