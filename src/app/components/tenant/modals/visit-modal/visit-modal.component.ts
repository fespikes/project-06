import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import {
  FormBuilder,
} from '@angular/forms';

import { TenantService } from '../../tenant.service';
import { TuiMessageService } from 'tdc-ui';

@Component({
  selector: 'fed-visit-modal',
  templateUrl: './visit-modal.component.html',
  styleUrls: ['./visit-modal.component.sass']
})
export class VisitModalComponent implements OnInit {
  loading = false;
  TAs: any[];
  filter: any = {};
  last: string;
  set lastOne(trust) {
    this.last = trust;
  }
  get lastOne() {
    return this.last;
  }
  lastIsOwner = false;

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService,
    private message: TuiMessageService
  ) {
    this.filter.tenantName = data.tenantName;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.api.tenantAccess('get', this.filter)
      .subscribe( res => {
        this.TAs = res.body;
        console.log(res);
        this.loading = false;
      });
  }

  remove(item) {
    this.filter.username = item.username;
    this.api.tenantAccess('delete', this.filter).subscribe( res => {
        console.log(res);
        delete this.filter.username;
        this.fetchData();
    });
  }

  addInfo(tgt, flag?: boolean, type?) {
    if (flag) {
      return this.lastOne = undefined;
    }
    if (tgt) {
      if ( this.TAs.some(item => item.username === tgt.value)) {
        this.message.error('租户管理员已存在');
      } else {
        this.api.tenantAccess('post', {
          tenantName: this.filter.tenantName,
          tenantOwner: this.lastIsOwner,
          username: tgt.value
        }).subscribe(res => {
            this.fetchData();
          });
      }
    } else {
      document.querySelector('.tui-table-scroll-body').scroll(0, 0);
    }
    this.lastOne = '';
  }

  operate(method, item) {
    const param = {
      tenantName: this.filter.tenantName,
      username: item.username,
    }
    this.api.tenantAccess(method, (method === 'delete' ? {
      ...param,
      ownershipOnly: true,
    } : {
      ...param,
      tenantOwner: true
    })).subscribe( res => {
      this.fetchData();
    });
  }




  closeSelf() {
    this.modal.close();
  }
}
