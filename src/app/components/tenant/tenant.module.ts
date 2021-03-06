import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClipboardModule} from 'ngx-clipboard';
import { I18nModule, TranslateService } from 'app/i18n';

import { SharedModule } from 'app/shared';
import { federation_server } from 'app/shared/app.tokens';
import { TenantRoutingModule } from './tenant-routing.module';
import {ModalsService} from './modals.service';
import {TenantService} from './tenant.service';
import { DetailsComponent } from './details/details.component';

import {
  TenantModalComponent,
  TruthModalComponent,
  VisitModalComponent,
  AuthProviderComponent,
  AccessTokenModalComponent,
  OauthClientComponent,
} from './modals';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    DetailsComponent,
    TenantModalComponent,
    AccessTokenModalComponent,
    TruthModalComponent,
    VisitModalComponent,
    ListComponent,
    AuthProviderComponent,
    OauthClientComponent
  ],
  entryComponents: [
    TenantModalComponent,
    TruthModalComponent,
    VisitModalComponent,
    AuthProviderComponent,
    AccessTokenModalComponent,
    OauthClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    I18nModule,
    TenantRoutingModule,
    ClipboardModule
  ],
  providers: [
    TenantService,
    ModalsService,
    {
      provide: federation_server,
      useFactory: function() {
        return null;
      }
    }
  ]
})
export class TenantModule { }
