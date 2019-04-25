import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClipboardModule} from 'ngx-clipboard';

import { SharedModule } from 'app/shared';

import { AccessTokenRoutingModule } from './access-token-routing.module';
import { AccessTokenComponent } from './access-token.component';
import { AccessTokenModalComponent } from './modals';
import { ModalsService } from './modals/modals.service';
import { AccessTokenService } from './access-token.service';


@NgModule({
  declarations: [
    AccessTokenComponent,
    AccessTokenModalComponent,
  ],
  entryComponents: [
    AccessTokenModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    AccessTokenRoutingModule
  ],
  providers: [
    ModalsService,
    AccessTokenService
  ]
})
export class AccessTokenModule { }
