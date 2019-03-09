import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {
  TranslateResolver,
  TranslateDeactivator,
  TranslateToken,
} from './i18n';

import { FederationGuard } from 'app/shared';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: './components/account/account.module#AccountModule',
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [FederationGuard],
    children: [
      {
        path: 'tenant',
        loadChildren: './components/tenant/tenant.module#TenantModule',
      },
      {
        path: 'users',
        loadChildren: './components/users/users.module#UsersModule',
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'access-token',
        loadChildren: './components/access-token/access-token.module#AccessTokenModule',
      },
      {
        path: 'users',
        loadChildren: './components/users/users.module#UsersModule',
      },
      {
        path: '',
        redirectTo: 'tenant',
        pathMatch: 'full',
      }
    ]
  },
  
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        resolve: [TranslateResolver],
        canDeactivate: [TranslateDeactivator],
        children: routes,
      },
    ], {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [
    TranslateDeactivator,
    TranslateResolver,
    {
      provide: TranslateToken,
      useValue: 'common'
    },
  ]
})
export class AppRoutingModule { }
 