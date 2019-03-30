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
  userName: string;
  filter: any = {
    // tenant: '',
    // username: ''
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
        this.filter.searchValue = argu;
        this.getOwnTenants();
      });
  }

  searchTenants($event) {
    this.searchSubject.next($event.target.value);
  }

  getOwnTenants() {
    this.loading = true;
    this.userName = session.userName;

    if (session.isTenant === 'true') {
      this.filter.tenant = session.tenant;
      this.api.getTenantsByTenantName(session.tenant)
        .subscribe( res => {
          this.tenants = [];
          // this.tenants = res;
        });
    } else {
      this.api.getTenants(this.filter, false)
        .subscribe(res => {
          this.loading = false;
          let accesses = this.sortTenants(res.body);
          this.api.getTenantDetails(accesses)
            .subscribe(rs => {
              this.tenants = this.mergeTenants(rs.body, accesses);
              // TODO: due to api change, let's holdon here
            });
        });
    }
  }

  sortTenants(tenants: any[]) {
    const owners = tenants.filter( item => item.tenantOwner );
    const noOwners = tenants.filter( item => !item.tenantOwner );
    return owners.concat(noOwners);
  }

  mergeTenants(tenants, accesses) {
    tenants.forEach(element => {
      element.tenantOwner = accesses.filter( ele => {
        return ele.tenantName == element.name;
      })[0].tenantOwner
    });
    return tenants;
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
