import { Component, OnInit, Inject } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { tenantPrivacyTypes, tenantActionTypes } from '../../tenant.model';
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
    return this.myForm ? this.myForm.get('providerId').value : this.params.providerId !== '' &&
      (this.params.attributes['guardian.server.tls.enabled'] !== undefined);
  };
  // guardian.server
  params = {
    tenant: '',
    providerId: '',
    type: '',
    attributes: {
      'guardian.server.tls.enabled': undefined,
      'guardian.server.address': 'hostname:port'
    }
  };
  providerTypes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService
  ) {
    this.actionType = data.type;
    this.params = data.provider || this.params;
    this.params.type = this.params.type || this.providerTypes[0];
    this.tenantName = data.tenantName;

    if (data.type !== 'remove') {
      if (data.type === 'register') {
        this.api.fetchProviderTypes()
          .subscribe(res => {
            this.providerTypes = res;
            this.myForm.controls['type'].setValue(res[0]);
          });
      }

      let group;
      if (data.type === 'register') {
        group = {
          'providerId': ['', Validators.required],  // 名称
          'type': ['', Validators.required],
          'address': ['', Validators.required]
        };
      } else {
        group = {
          'providerId': [this.params.providerId],  // 名称
          'type': [this.params.type],
          'address': [
            this.params.attributes['guardian.server.address'],
            Validators.required
          ]
        }
      }

      this.myForm = this.fb.group(group);
      if (data.type === 'edit') {
        this.myForm.controls['providerId'].disabled;
        this.myForm.controls['type'].disabled;
      }
    }
  }

  ngOnInit() {}

  submit() {
    let observe: any;
    if (this.actionType !== 'remove') {
      const controls = this.myForm.controls;
      this.params.providerId = controls['providerId'].value;
      this.params.type = controls['type'].value;
      this.params.attributes['guardian.server.address'] = controls['address'].value;
      this.params.tenant = this.tenantName
    }
    
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

  closeSelf() {
    this.modal.close();
  }

}
