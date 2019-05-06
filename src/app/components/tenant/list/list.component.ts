import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TuiMessageService } from 'tdc-ui';

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
  @HostBinding('class.main') hostClass = true;
  
  searchSubject = new Subject();
  loading = false;
  tenants = [];
  userName: string;
  tenant: string;
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
    private modal: ModalsService,
    private message: TuiMessageService
  ) {}

  ngOnInit() {
    this.getOwnTenants();
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
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
    this.tenant = session.tenant;

    if (session.isTenant === 'true') {
      this.filter.tenant = session.tenant;
      this.api.getTenants({tenant: session.tenant}, true)
        .subscribe( res => {
          this.tenants = [res];
          this.loading = false;
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
      if (type === 'remove' && argu) {
        this.api.tenantMaintain(tenant.name, 'delete')
          .subscribe(res => {
            this.getOwnTenants();
            this.message.success('删除成功');
          });
      } else if (argu) {
        this.getOwnTenants();
      }
    });
  }

  imageSrc(element) {
    const base = session.basePath;
    return base + 'assets/icons/svg/letters/'+ (element + '').slice(0,1).toUpperCase() +'.svg';
  }

}
