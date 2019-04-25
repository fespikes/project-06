import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import {
  FormBuilder,
} from '@angular/forms';

import { TenantService } from '../../tenant.service';
import { TuiMessageService } from 'tdc-ui';

@Component({
  selector: 'fed-truth-modal',
  templateUrl: './truth-modal.component.html',
  styleUrls: ['./truth-modal.component.sass']
})
export class TruthModalComponent implements OnInit {
  @ViewChild('dstTenantLast') focus: ElementRef;
  trusts: any;
  filters: any = {};
  last: string;
  set lastTrust(trust) {
    this.last = trust;
  }
  get lastTrust() {
    return this.last;
  }

  constructor(
    private fb: FormBuilder,
    private modal: TuiModalRef,
    @Inject(TUI_MODAL_DATA) data,
    private api: TenantService,
    private message: TuiMessageService
  ) {
    this.filters.src = data.tenant.name;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.trusts('get', this.filters)
      .subscribe(res => {
        console.log(res);
        this.trusts = res.body;
      });
  }

  remove(item) {
    this.api.trusts(
      'delete',
      {
        dst: item.dstTenant,
        src: item.srcTenant
      }
    ).subscribe( res => {
        console.log(res);
        this.fetchData();
    });

  }

  addInfo(dstTenantLast, remove?: boolean) {
    if (remove) {
      return this.lastTrust = undefined;
    }
    if (dstTenantLast) {
      if ( this.trusts.some(item => item.dstTenant === dstTenantLast.value)) {
        this.message.error('租户名已存在');
      } else {
        this.api.trusts('post', {
          dstTenant: dstTenantLast.value,
          srcTenant: this.filters.src   // current tenant
        }).subscribe(res => {
            this.fetchData();
          });
      }
    } else {
      document.querySelector('.tui-table-scroll-body').scroll(0, 0);
      this.focus && this.focus.nativeElement.focus();
    }
    this.lastTrust = '';
  }

  closeSelf() {
    this.modal.close();
  }

}
