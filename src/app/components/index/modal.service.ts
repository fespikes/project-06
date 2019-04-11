import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { InvitationModalComponent } from './invitation-modal/invitation-modal.component';
import { PwdModalComponent } from './pwd-modal/pwd-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  constructor(
    private modal: TuiModalService,
  ) { }

  profileModal() {
    let title = '账号信息';
    return this.modal.open(ProfileModalComponent, {
      title: title,
      data: {
      },
      size: 'md'
    });
  }

  pwdModal() {
    let title = '修改密码';
    return this.modal.open(PwdModalComponent, {
      title: title,
      data: {
      },
      size: 'md'
    });
  }

  invitationModal() {
    let title = '生成邀请链接';
    return this.modal.open(InvitationModalComponent, {
      title: title,
      data: {
      },
      size: 'md'
    });
  }

}
