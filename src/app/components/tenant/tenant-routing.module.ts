import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TranslateDeactivator, TranslateResolver, TranslateToken} from 'app/i18n';

import { ListComponent } from './list/list.component';
import {DetailsComponent} from './details/details.component';

const tenantRoutes: Routes = [
  {
    path: '',
    // component: TenantComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
    children: [
      {
        path: 'list',
        component: ListComponent
      },{
        path: ':name',
        component: DetailsComponent
      },{
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(tenantRoutes)],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'tenant'
    },
  ]
})
export class TenantRoutingModule { }
