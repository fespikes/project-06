import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateDeactivator, TranslateResolver, TranslateToken} from 'app/i18n';

import { UsersComponent } from './users.component';

const usersRoutes: Routes = [
  {
    path: '',
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
    children: [
      {
        path: 'list',
        component: UsersComponent
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
