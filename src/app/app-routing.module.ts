import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { LoginMainComponent } from './login-main/login-main.component';

import {
  TranslateResolver,
  TranslateDeactivator,
  TranslateToken,
} from './i18n';

const routes: Routes = [
  {
    path: '',
    component: LoginMainComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
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
 