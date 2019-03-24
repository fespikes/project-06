import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ClientSecretModalComponent,
  GuardianModalComponent,
  OauthClientComponent,
} from './modals';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    DetailsComponent,
    TenantModalComponent,
    GuardianModalComponent, 
    AccessTokenModalComponent,
    ClientSecretModalComponent,
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
    ClientSecretModalComponent,
    GuardianModalComponent,
    OauthClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    I18nModule,
    TenantRoutingModule
  ],
  providers: [
    TenantService,
    ModalsService,
    TranslateService,
    {
      provide: federation_server,
      useFactory: function() {
        return null;
      }
    }
  ]
})
export class TenantModule { }
