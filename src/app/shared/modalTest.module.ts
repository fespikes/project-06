import { NgModule } from '@angular/core';
import { of } from 'rxjs';

import {
  TuiModule,
  FormModule,
  TUI_MODAL_DATA,
  TuiModalRef,
} from 'tdc-ui';
export class TuiModalServiceStub {
  open() {
    return of();
  }
}

@NgModule({
  imports: [
    TuiModule,
    FormModule,
  ],
  providers: [
    TuiModalRef,
    {
      provide: TUI_MODAL_DATA,
      useValue: {}
    },
    // {
    //   provide: TuiModalService,
    //   useClass: TuiModalServiceStub
    // }
  ],
  exports: [
    TuiModule,
    FormModule,
  ]
})
export class ModalTestModule { }
