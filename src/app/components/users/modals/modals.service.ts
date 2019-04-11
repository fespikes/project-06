import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { UserComponent } from './user/user.component';


@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    public modal: TuiModalService
  ) { }

  userModal(type, user?) {
    let title = '';
    switch (type) {
      case 'register':
        title = '添加用户';
      break;
      case 'edit':
        title = '编辑用户' ;
      break;
      case 'reset-pwd':
        title = '重置密码' ;
      break;
      case 'remove':
        title = '删除' ;
        return this.modal.error({
          title: title,
          message: `确认删除 “${user.username}”？`
        });
      break;
    }

    return this.modal.open(UserComponent, {
      title: title,
      data: {
        type,
        user
      },
      size: 'md'
    });
  }
}
