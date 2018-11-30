import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginMainComponent } from './login-main/login-main.component';

const routes: Routes = [
  {
    path: '',
    component: LoginMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
