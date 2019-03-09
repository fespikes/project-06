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
  get submitAble() {
    return this.params.name !== '' && (this.params.tls.enabled !== undefined);
  };
  // guardian.server
  params = {
    name: '',
    // address: '',
    tls: {
      enabled: false
    },
    type: ''
  };
  providerTypes = ObjectToArray(providerTypes, 'value');

  constructor(
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService
  ) {
    this.actionType = data.type;
    this.params.type = this.providerTypes[0];
    this.params = data.provider || this.params;
  }

  ngOnInit() {
  }

  checkboxChange($event) {
    console.log($event);
  }

  submit() {
    let observe: any;
    switch (this.actionType) {
      case 'register':
        observe = this.api.providerMaintain(this.params.name, 'post', this.params);
        break;
      case 'details':
        observe = this.api.providerMaintain('', 'post', this.params);
        break;
      case 'remove':
        observe = this.api.providerMaintain(this.params.name, 'delete');
        break;
    }

    observe.subscribe(res => {
      this.modal.close(res);
    });
  }

}
