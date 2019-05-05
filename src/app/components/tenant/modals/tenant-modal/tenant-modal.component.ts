import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { tenantPrivacyTypes, tenantActionTypes } from '../../tenant.model';
import { TenantService } from '../../tenant.service';
import { ObjectToArray, getAttrsFromObj } from 'app/shared/utils';

@Component({
  selector: 'fed-tenant-modal',
  templateUrl: './tenant-modal.component.html',
  styleUrls: ['./tenant-modal.component.sass']
})
export class TenantModalComponent implements OnInit {
  @ViewChild('focus') focus: ElementRef;
  actionType: 'edit' | 'create' | 'remove';
  tenantPrivacyTypes = ObjectToArray(tenantPrivacyTypes, true);
  params: any = {
    'attributes': {},
    'name': '',
    'type': '',
    'description': '',
    'createTime': 0
  };
  last: any = {};
  attrs: any[] = [];
  myForm: FormGroup;

  get addAble() {
    return (this.last.key === '') || (this.last.value === '');
  }

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService
  ) {
    this.actionType = data.type;
    if (data.tenant) {
      this.params = data.tenant;
      this.attrs = getAttrsFromObj(data.tenant.attributes);
    } else {
      this.params.type = this.tenantPrivacyTypes[0];
    }
  }

  ngOnInit() {
    if (this.actionType === 'edit') {
      this.myForm = this.fb.group({
        'name': [this.params.name, Validators.required],
        'type': [this.params.type, Validators.required],
        'description': [this.params.description]
      });
      this.myForm.controls['name'].disable();
      this.myForm.controls['type'].disable();
    } else {
      this.myForm = this.fb.group({
        'name': ['', Validators.required],
        'type': ['', Validators.required],
        'description': ['']
      });
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
  }

  submit(val) {
    if (this.actionType !== tenantActionTypes.remove) {
      this.params.name = val.name;
      this.params.type = val.type;
      if (this.last && (this.last.key !== undefined) && (this.last.value !== undefined)) {
        this.attrs.push(this.last);
        this.last = {};
      }
      this.attrs.forEach(item => {
        this.params.attributes[item.key] = item.value;
      });
    }

    let observe: any;
    switch (this.actionType) {
      case tenantActionTypes.edit:
        observe = this.api.tenantMaintain(this.params.name, 'put', this.params);
        break;
      case tenantActionTypes.create:
        observe = this.api.tenantMaintain('', 'post', this.params);
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

}
