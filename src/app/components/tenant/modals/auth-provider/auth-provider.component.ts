import { Component, OnInit, Inject } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

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
  myForm: FormGroup;
  actionType: string;
  tenantName: string;
  get submitAble() {
    // return this.params.providerId !== '' &&
    return this.myForm.get('providerId').value !== '' &&
      (this.params.attributes['guardian.server.tls.enabled'] !== undefined);
  };
  // guardian.server
  params = {
    providerId: '',
    // address: '',
    // TODO:
    type: '',
    attributes: {
      'guardian.server.tls.enabled': undefined,
      'guardian.server.address': 'hostname:port'
    }
  };
  // providerTypes = ObjectToArray(providerTypes, 'value');
  providerTypes: any = ObjectToArray(providerTypes, 'value');

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService
  ) {
    this.actionType = data.type;
    this.api.fetchProviderTypes()
      .subscribe(res => {
        this.providerTypes = res;
      });
    this.params = data.provider || this.params;
    this.params.type = this.params.type || this.providerTypes[0];
    this.tenantName = data.tenantName;

    this.myForm = this.fb.group({
      'providerId': ['', Validators.required],  // 名称
      'type': ['', Validators.required],
      'address': ['', Validators.required]
    });
  }

  ngOnInit() {}

  checkboxChange($event) {
    console.log($event);
  }

  submit(val: {[s: string]: string}) {
    let observe: any;
    this.params.providerId = val.providerId;
    this.params.type = val.type;
    this.params.attributes['guardian.server.address'] = val.address;
    
    console.log(this.params.attributes['guardian.server.tls.enabled']);
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
