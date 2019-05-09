import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA, TuiMessageService } from 'tdc-ui';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { TenantService } from '../../tenant.service';
import { session, ObjectToArray, getUnitAndMax, getAttrsFromObj } from 'app/shared';

@Component({
  selector: 'fed-oauth-client',
  templateUrl: './oauth-client.component.html',
  styleUrls: ['./oauth-client.component.sass']
})
export class OauthClientComponent implements OnInit {
  @ViewChild('focus') focus: ElementRef;
  myForm: FormGroup;
  actionType: string;
  tenant: string;
  params: any = {
    'appName': '',  // 名称
    'clientId': '',
    'type': '',
    'redirectUris': [],
    'accessTokenValiditySeconds': 0,  // Access Token有效时间（单位为秒）
    'refreshTokenValiditySeconds': 0, // Refresh Token有效时间
    'additionalInfo': {}, // 自定义信息
    'noExpire': true
  };
  oAuthPrivacyTypes: any[] = [];
  clientId: string;
  at = 0;
  rt = 0;
  hourMax = 1000;

  last: any = {}
  attrs: any[] = [];
  get addAble() {
    return (this.last.key === '') || (this.last.value === '');
  }
  get submitAble() { // TODO:
    return this.params.name !== '';
  }
  now = new Date();
  returned: any;
  modalFunction: any;
  fetchOAuthClients: any;

  constructor(
    private api: TenantService,
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private message: TuiMessageService
  ) {
    this.actionType = data.type;
    this.tenant = data.tenantName;
    if (this.actionType === 'register') {
      this.returned = data.returned;
      this.modalFunction = data.modalFunction;
    }
    if (this.actionType ==='return' || (this.actionType ==='clientSecret')) {
      this.returned = data.returned;
      this.fetchOAuthClients = data.fetchOAuthClients;
      return;
    }
    this.oAuthPrivacyTypes = ObjectToArray(session.oAuthPrivacyTypes, true);
    if (data.type === 'edit') {
      this.params = data.client;
      this.attrs = getAttrsFromObj(this.params.additionalInfo);
    }
    console.log('data.type:', this.params, this.attrs);
  }

  ngOnInit() {
    let group;
    if (this.actionType === 'register') {
      group = {
        'appName': ['', Validators.required],
        'clientId': [''],
        'type': [this.oAuthPrivacyTypes[0], Validators.required],
        'redirectUris': ['', Validators.required], // TODO:
        'accessTokenValiditySeconds': [0, Validators.required],  // Access Token有效时间（单位为秒）
        'refreshTokenValiditySeconds': [0, Validators.required], // Refresh Token有效时间
      };
    } else if (this.actionType === 'edit') {
      this.at = this.params.accessTokenValiditySeconds / 3600;
      this.rt = this.params.refreshTokenValiditySeconds / 3600;
      group = {
        'appName': [this.params.appName, Validators.required],
        'clientId': [this.params.clientId],
        'type': [this.params.type, Validators.required],
        'redirectUris': [this.params.redirectUris.join('\n'), Validators.required], // TODO:
        'accessTokenValiditySeconds': [
          this.params.accessTokenValiditySeconds, Validators.required
        ],  // Access Token有效时间（单位为秒）
        'refreshTokenValiditySeconds': [
          this.params.accessTokenValiditySeconds, Validators.required
        ] // Refresh Token有效时间
      };
    }
    group && (this.myForm = this.fb.group(group));
    if (this.myForm && (this.actionType === 'edit')) {
      this.myForm.controls['appName'].disable();
      this.myForm.controls['type'].disable();
    }
  }

  addInfo() {
    if (this.last.key && this.attrs.filter(item => item.key === this.last.key).length===0) {
      this.attrs.push(this.last);
    }
    this.last = {
      key: '',
      value: ''
    };
    this.focus && this.focus.nativeElement.focus();
    return false;
  }

  submit(val: {[s:string]: string}) {
    let observe: any;
    const params = {...this.params};
    if (this.actionType === 'register') {
      const item = val['redirectUris'].split('\n');
      params.redirectUris = item.filter(ele => ele!=='');
    } else if (this.actionType === 'edit') {
      params.clientId = val['clientId'];
      params.type = val['type'];
      params.redirectUris = val['redirectUris'].split(' ');
    }

    if (this.actionType !== 'remove') {
      if (this.last && (this.last.key !== undefined) && (this.last.value !== undefined)) {
        this.attrs.push(this.last);
        this.last = {};
      }
      this.attrs.forEach(item => {
        params.additionalInfo[item.key] = item.value;
      });

      params.type = val['type'];
      params.appName = val['appName'];
      params.accessTokenValiditySeconds = this.at * 3600;
      params.refreshTokenValiditySeconds = this.rt * 3600;
      params.noExpire && (delete params.refreshTokenValiditySeconds);
    }

    switch (this.actionType) {
      case 'register':
        observe = this.api.oAuthClients(this.tenant, 'post', params);
        break;
      case 'edit':
        params.appName = this.params.appName;
        params.type = this.params.type;
        observe = this.api.oAuthClients(this.tenant, 'put', params, params.clientId);
        break;
    }

    observe.subscribe(res => {
      this.modal.close(res);
      if (this.actionType === 'register') {
        this.modalFunction('', 'return', '', res);
      }
    });
  }

  copy($event) {
    this.message.success($event + '复制成功！')
  }

}
