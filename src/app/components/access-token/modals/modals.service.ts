import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { AccessTokenModalComponent } from './';
import { actionTypes } from '../access-token.model';
import { AccessTokenService } from '../access-token.service';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    public modal: TuiModalService,
    private api: AccessTokenService
  ) { }

  accessTokenModal(type, token?) {
    let title = '';
    const getName = function(token) {
      let name = token.name + '';
        name = name.length > 25 ? (name.slice(0, 25) + '...') : name;
        return name;
    }
    switch (type) {
      case actionTypes.create:
        title = '创建Access Token'
        break;
      case actionTypes.edit:
        title = '编辑Access Token'
        break;
      case actionTypes.remove:
        title = '删除Access Token'
        return this.modal.error({
          title: title,
          message: `确认删除 “${token.name}”？`
        });
      case actionTypes.return:
        title = `提示`;
        break;
      case actionTypes.refresh:
        title = ` “${getName(token)}” 的自动刷新配置`;
        break;
      case actionTypes.taskCreate:
        title = `创建 “${getName(token)}” 的自动刷新任务`;
        break;
    }
    const size = (type === actionTypes['return'] || type === actionTypes['refresh'])?
      'md' : 'lg';
    return this.modal.open(AccessTokenModalComponent, {
      title: title,
      data: {
        type,
        ...token
      },
      size: size
    });
  }

}
