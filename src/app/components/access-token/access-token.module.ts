import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessTokenRoutingModule } from './access-token-routing.module';
import { AccessTokenComponent } from './access-token.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AccessTokenComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AccessTokenRoutingModule
  ]
})
export class AccessTokenModule { }
