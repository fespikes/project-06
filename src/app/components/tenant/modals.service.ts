import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import {
  TenantModalComponent,
  TruthModalComponent,
  VisitModalComponent,
  AuthProviderComponent,
  OauthClientComponent,
  AccessTokenModalComponent,
  ClientSecretModalComponent,
  GuardianModalComponent,
} from './modals';
import { tenantActionTypes as actionTypes } from './tenant.model';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  constructor(
    public modal: TuiModalService,
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

  AuthProvider(provider, type?, tenantName?) {
    let title = '';
    switch (type) {
      case 'register':
        title = '注册认证源'
        break;
      case 'edit':
        title = '认证源' + '-' + provider.providerId;
        break;
      case 'remove':
        title = '删除认证源'
        break;
    }
    return this.modal.open(AuthProviderComponent, {
      title: title,
      data: {
        provider,
        type,
        tenantName: tenantName
      },
      size: 'md'
    });
  }

  authClient(client?, type?, tenantName?, returned?, modalFunction?, fetchOAuthClients?) {
    let title = '';
    switch (type) {
      case 'register':
        title = '注册OAuth2 Client'
        break;
      case 'edit':
        title = '编辑OAuth2 Client';
        break;
      case 'remove':
        title = '删除OAuth2 Client'
        break;
      case 'return':
        title = '生成Client ID 和 Client Secret'
        break;
        break;
      case 'clientSecret':
        title = '更新 Client Secret'
        break;
    }
    if (type === 'remove') {
      return this.modal.error({
        title: title,
        message: `确认删除 “${client.clientId}”？`
      });
    }
    return this.modal.open(OauthClientComponent, {
      title: title,
      data: {
        type,
        client,
        tenantName,
        returned,
        modalFunction
      },
      size: (type === 'return' || (type === 'clientSecret')) ? 'md' : 'lg'
    });
  }

  accessToken(oAuthClient, type?) {
    let title = '查看Access Token';
    return this.modal.open(AccessTokenModalComponent, {
      title: title,
      data: {
        oAuthClient,
        type,
      },
      size: 'lg'
    });
  }
}
