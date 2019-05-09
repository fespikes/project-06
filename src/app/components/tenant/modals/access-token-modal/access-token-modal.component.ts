import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TuiMessageService } from 'tdc-ui';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { tenantPrivacyTypes, tenantActionTypes } from '../../tenant.model';
import { TenantService } from '../../tenant.service';
import { ObjectToArray, getAttrsFromObj } from 'app/shared/utils';

@Component({
  selector: 'fed-access-token-modal',
  templateUrl: './access-token-modal.component.html',
  styleUrls: ['./access-token-modal.component.sass']
})
export class AccessTokenModalComponent implements OnInit {
  oAuthClient: any = {};
  accessTokens: any[] = [];
  filter: any = {};
  now = new Date();

  constructor(
    private fb: FormBuilder,
    public modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) private data,
    private api: TenantService,
    private message: TuiMessageService
  ) {
    this.oAuthClient = data.oAuthClient;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.fetchAccessToken(this.oAuthClient.clientId, this.filter)
      .subscribe(res => {
        this.accessTokens = res['body'];
      });
  }

  copy($event) {
    this.message.success($event + '复制成功！')
  }

}
