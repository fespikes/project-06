import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ApiService,
  AuthService,
  FederationGuard,
} from './services';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    AuthService,
    FederationGuard,
  ]
})
export class SharedModule { }
