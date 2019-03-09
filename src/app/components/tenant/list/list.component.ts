import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TenantService } from '../tenant.service';
import { ModalsService } from '../modals.service';
import { adminRoles, tenantActionTypes } from '../tenant.model';
import { session } from 'app/shared/utils';

@Component({
  selector: 'fed-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  searchSubject = new Subject();
  loading = false;
  tenants = [];
  filter: any = {
    // tenant: '',
    username: ''
  };
  hoverIndex;
  adminRoles = adminRoles;
  tenantActionTypes = tenantActionTypes;

  constructor(
    private el: ElementRef,
    private api: TenantService,
    private modal: ModalsService
  ) {}

  ngOnInit() {
    this.getOwnTenants();
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((argu) => {
        this.filter.tenant = argu;
        this.getOwnTenants();
      });
  }

  searchTenants($event) {
    this.searchSubject.next($event.target.value);
  }

  getOwnTenants() {
    this.loading = true;
    if (this.filter.tenant === '') {
      delete this.filter.tenant;
    }
    this.filter.username = session.getUserName();
    this.api.getTenants(this.filter)
      .subscribe(res => {
        this.loading = false;
        this.tenants = this.sortTenants(res);
      });
  }

  sortTenants(tenants: any[]) {
    const owners = tenants.filter( item => item.tenantOwner );
    const noOwners = tenants.filter( item => !item.tenantOwner );
    return owners.concat(noOwners);
  }

  showModal(tenant, type) {
    this.modal.tenantModal({
      tenant: tenant,
      type
    }).subscribe(argu => {
      this.getOwnTenants();
    });
  }

}
