import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import {
  TenantModalComponent,
  TruthModalComponent,
  VisitModalComponent,
  AuthProviderComponent,
  AccessTokenModalComponent,
  ClientSecretModalComponent,
  GuardianModalComponent,
  OauthModalComponent,
} from './modals';
import { tenantActionTypes as actionTypes } from './tenant.model';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  constructor(
    private modal: TuiModalService,
  ) { }

  tenantModal(argu) {
    let title = '';
    switch (argu.type) {
      case actionTypes.edit:
        title = '编辑租户'
        break;
      case actionTypes.create:
        title = '创建租户'
        break;
      case actionTypes.remove:
        title = '删除租户'
        break;
    }
    return this.modal.open(TenantModalComponent, {
      title: title,
      data: {
        ...argu
      },
      size: 'md'
    });
  }

  truthManagement(argu?) {
    let title = '信任管理';
    return this.modal.open(TruthModalComponent, {
      title: title,
      data: {
        ...argu
      },
      size: 'md'
    });
  }

  visitManagement(argu?) {
    let title = '访问管理';
    return this.modal.open(VisitModalComponent, {
      title: title,
      data: {
        ...argu
      },
      size: 'md'
    });
  }

  AuthProvider(provider, type?) {
    let title = '';
    switch (type) {
      case 'register':
        title = '注册认证源'
        break;
      case 'details':
        title = '认证源' + '-' + provider.name;
        break;
      case 'remove':
        title = '删除认证源'
        break;
    }
    return this.modal.open(AuthProviderComponent, {
      title: title,
      data: {
        ...provider,
        type
      },
      size: 'md'
    });
  }

  registerAuthProvider(argu?) {
    let title = '注册认证源';
    return this.modal.open(OauthModalComponent, {
      title: title,
      data: {
        ...argu
      },
      size: 'md'
    });
  }

}
