import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateDeactivator, TranslateResolver, TranslateToken} from 'app/i18n';

import { ListComponent } from './list/list.component';

const usersRoutes: Routes = [
  {
    path: '',
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
    children: [
      {
        path: 'list',
        component: ListComponent
      },{
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'users'
    },
  ]
})
export class UsersRoutingModule { }
