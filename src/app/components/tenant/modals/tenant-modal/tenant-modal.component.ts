import { Component, OnInit, Inject } from '@angular/core';

import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { tenantGroups, tenantActionTypes } from '../../tenant.model';
import { TenantService } from '../../tenant.service';
import { ObjectToArray } from 'app/shared/utils';

@Component({
  selector: 'fed-tenant-modal',
  templateUrl: './tenant-modal.component.html',
  styleUrls: ['./tenant-modal.component.sass']
})
export class TenantModalComponent implements OnInit {
  actionType: 'edit' | 'create' | 'remove';
  tenantGroups = ObjectToArray(tenantGroups)
  params: any = {
    'attributes': {},
    'name': '',
    'type': ''
  };
  last: any = {};
  attrs: any[] = [];
  get addAble() {
    return (this.last.key === '') || (this.last.value === '');
  }
  get submitAble() {
    return this.params.name !== '';
  }

  constructor(
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService
  ) {
    this.actionType = data.type;
    if (data.tenant) {
      this.params = data.tenant;
    } else {
      this.params.type = this.tenantGroups[0];
    }
  }

  ngOnInit() {
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
  }

  submit() {
    if (this.last && (this.last.key !== '') && (this.last.value !== '')) {
      this.attrs.push(this.last);
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

}
