import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from 'app/i18n';

import { SharedModule } from 'app/shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { UsersService } from './users.service';
import { ModalsService, UserComponent } from './modals';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
  ],
  entryComponents: [
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    I18nModule,
    UsersRoutingModule
  ],
  providers: [
    UsersService,
    ModalsService
  ]
})
export class UsersModule { }
