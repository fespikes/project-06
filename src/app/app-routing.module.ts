import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {
  TranslateResolver,
  TranslateDeactivator,
  TranslateToken,
} from './i18n';

import { FederationGuard } from 'app/shared';
import { LoginMainComponent } from './login-main/login-main.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginMainComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [FederationGuard],
  }
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
      useValue: 'login'
    },
  ]
})
export class AppRoutingModule { }
 