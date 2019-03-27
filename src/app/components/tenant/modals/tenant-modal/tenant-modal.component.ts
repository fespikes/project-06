import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { tenantGroups, tenantActionTypes } from '../../tenant.model';
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
  tenantGroups = ObjectToArray(tenantGroups, 'value');
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
  get submitAble() {
    return this.params.name !== '';
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
      this.params.type = this.tenantGroups[0];
    }
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'name': ['', Validators.required],
      'type': ['', Validators.required],
      'description': ['']
    });
    this.myForm.statusChanges.subscribe(argu => {
      console.log(this.myForm);
    });
    this.myForm.valueChanges.subscribe(argu => {
      console.log(this.myForm);
    });
  }

  typeChange() {
  }

  addInfo() {
    if (this.last.key && this.attrs.filter(item => item.key === this.last.key).length===0) {
      this.attrs.push(this.last);
    }
    this.last = {
      key: '',
      value: ''
    };
    this.focus.nativeElement.focus();
  }

  submit() {
    if (this.actionType !== tenantActionTypes.remove) {
      if (this.last && (this.last.key !== '') && (this.last.value !== '')) {
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
      case tenantActionTypes.remove:
        observe = this.api.tenantMaintain(this.params.name, 'delete');
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
