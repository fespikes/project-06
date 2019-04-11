import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import { AccessTokenService } from '../../access-token.service';
import { actionTypes } from '../../access-token.model';
import { ObjectToArray } from 'app/shared/utils';

@Component({
  selector: 'fed-access-token-modal',
  templateUrl: './access-token-modal.component.html',
  styleUrls: ['./access-token-modal.component.sass']
})
export class AccessTokenModalComponent implements OnInit {
  @ViewChild('focus') focus: ElementRef;
  actionType: string;
  actionTypes = actionTypes;
  params: any = {
    'additionalInfo': {},
    'name': '',
    'refreshToken': {
      'validitySeconds': 0,
    },
    'validitySeconds': 0,

    hasRefreshToken: false,
    alwaysAvaliable: false
  };
  last: any = {};
  myForm: FormGroup;
  additionalInfos: any[] = [];

  autoRefresh = {
    name: '',
    triggerAutoRefresh: false,
    executionInterval: 0,
    refreshTokenValue: '',
    status: 'SCHEDULED' // SCHEDULED / STOPPED
  }

  get addAble() { return (this.last.key === '') || (this.last.value === '')}

  set hasRefreshToken(b) {
    this.params.hasRefreshToken = b;
    this.buildForm();
  }
  get hasRefreshToken() { return this.params.hasRefreshToken}
  set refreshTokenAlwaysWork(argu) {
    this.params.alwaysAvaliable = argu;
    this.buildForm();
  }
  get refreshTokenAlwaysWork() { return this.params.alwaysAvaliable}

  get submitAble() {
    const valid = this.myForm.get('name').valid && this.myForm.get('validitySeconds').valid;
    if (this.params.hasRefreshToken) {
      if (this.params.alwaysAvaliable) {
        return valid
      } else {
        return valid && this.myForm.get('refreshTokenValiditySeconds').valid;
      }
    } else {
      return valid;
    }
  }

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: AccessTokenService
  ) {
    this.actionType = data.type;
    this.autoRefresh.name = data.name;
    this.autoRefresh.refreshTokenValue = data.refreshToken.value;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    let values: any;
    if (this.myForm) {
      values = this.myForm.value;
    } else {
      values = {};
    }

    let group: any = {
      name: [ values.name || '', Validators.required],
      validitySeconds: [ values.validitySeconds || '', Validators.required]
    };

    if (this.params.hasRefreshToken) {
      group.refreshTokenValiditySeconds = this.params.alwaysAvaliable ? [values.refreshTokenValiditySeconds || ''] :
        [values.refreshTokenValiditySeconds || '', Validators.required];
    }
    this.myForm = this.fb.group(group);
  }

  addInfo() {
    if (this.last.key && this.additionalInfos.filter(item => item.key === this.last.key).length===0) {
      this.additionalInfos.push(this.last);
    }
    this.last = {
      key: '',
      value: ''
    };
    this.focus && this.focus.nativeElement.focus();
  }

  removeSelf(self, flag) {
    const additional = this.additionalInfos.filter(item => {
      return (item.key !== self.key) && (item.value !== self.value);
    });
    if (flag) {
      this.last = {};
    } else {
      this.additionalInfos = additional;
    }
  }

  submit(val) {
    const params = {...this.params};
    params.name = val.name;
    params.validitySeconds = val.validitySeconds * 3600;
    if (this.actionType !== actionTypes.remove) {
      if (this.last && (this.last.key !== undefined) && (this.last.value !== undefined)) {
        this.additionalInfos.push(this.last);
        this.last = {};
      }
      this.additionalInfos.forEach(item => {
        this.params.additionalInfo[item.key] = item.value;
      });
    }
    
    if (params.alwaysAvaliable) {
      delete params.refreshToken.validitySeconds;
    } else if (val.refreshTokenValiditySeconds) {
      params.refreshToken.validitySeconds = val.refreshTokenValiditySeconds * 3600;
    }

    let observe: any;
    switch (this.actionType) {
      case actionTypes.edit:
        observe = this.api.tokens('put', params);
      break;
      case actionTypes.create:
        observe = this.api.tokens('post', params);
        break;
      case actionTypes.remove:
        observe = this.api.tokens('delete', params); // TODO;
        break;
    }

    observe.subscribe(res => {
      this.modal.close(res);
      this.last = null;
    });
  }

  quit() {
    this.modal.close();
  }

  setAutoRefresh() {
    this.modal.close({name: this.autoRefresh.name});
  }

  swithTaskStatus(status) {
    this.autoRefresh.status = status; // SCHEDULED   STOPPED
  }

  autoRefreshSubmit() {
    let method = 'post';
    const params: any = {...this.autoRefresh};
    if (params.triggerAutoRefresh) {
      method = 'post';
      params.executionInterval = params.executionInterval * 3600000;
    } else {
      method = 'delete';
    }

    this.api.tokenRefreshTask(method, params)
      .subscribe(res => {
        this.modal.close(res);
      });
  }

  
}
