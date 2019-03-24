import { Component, OnInit, Inject } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { tenantGroups, tenantActionTypes } from '../../tenant.model';
import { providerTypes } from '../../tenant.model';
import { TenantService } from '../../tenant.service';
import { ObjectToArray } from 'app/shared/utils';

@Component({
  selector: 'fed-auth-provider',
  templateUrl: './auth-provider.component.html',
  styleUrls: ['./auth-provider.component.sass']
})
export class AuthProviderComponent implements OnInit {
  actionType: string;
  tenantName: string;
  get submitAble() {
    return this.params.providerId !== '' && (this.params.tls.enabled !== undefined);
  };
  // guardian.server
  params = {
    providerId: '',
    // address: '',
    // TODO:
    tls: {
      enabled: false
    },
    type: '',
    tenant: '',
    attributes: {
      'guardian.server.tls.enabled': true,
      'guardian.server.address': 'hostname:port'
    }
  };
  providerTypes = ObjectToArray(providerTypes, 'value');

  constructor(
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService
  ) {
    this.actionType = data.type;
    this.params = data || this.params;
    this.params.type = this.params.type || this.providerTypes[0];
    this.tenantName = data.tenantName;
  }

  ngOnInit() {}

  checkboxChange($event) {
    console.log($event);
  }

  submit() {
    let observe: any;
    switch (this.actionType) {
      case 'register':
        observe = this.api.providerMaintain(this.tenantName, 'post', this.params);
        break;
      case 'edit':
        observe = this.api.providerMaintain(this.tenantName, 'put', this.params);
        break;
      case 'remove':
        observe = this.api.providerMaintain(this.tenantName, 'delete', this.params);
        break;
    }

    observe.subscribe(res => {
      this.modal.close(res);
    });
  }

}
