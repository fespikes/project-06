import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { ProfileModalComponent } from './profile-modal/profile-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  constructor(
    private modal: TuiModalService,
  ) { }

  profileModal(userName) {
    let title = '账号信息';
    return this.modal.open(ProfileModalComponent, {
      title: title,
      data: {
        'userName': userName
      },
      size: 'md'
    });
  }

}
