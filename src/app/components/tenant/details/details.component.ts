import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TenantService } from '../tenant.service';
import { tenantTypes, tenantActionTypes } from '../tenant.model';
import { ModalsService } from '../modals.service';

@Component({
  selector: 'fed-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  loading = false;
  tenantActionTypes = tenantActionTypes;
  details: any = {};
  tenantName = '';
  selectedIndex = 0;
  tenantTypes = Object.keys(tenantTypes);
  providersFilter: any = {};
  providers: any;
  clients: any;

  constructor(
    private route: ActivatedRoute,
    private service: TenantService,
    private modal: ModalsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.tenantName = params.get('tenantName');
        this.fetchData();
    });
  }

  fetchData() {
    const promises = [
      this.service.tenantMaintain(this.tenantName, 'get'),
      this.service.fetchProviders(this.tenantName),   // TODO:
      this.service.fetchClients(this.tenantName)
    ];
    combineLatest(promises)
      .subscribe(([details, providers, clients]) => {
        this.details = details;
        this.providers = providers;
        this.clients = clients;
      });
  }

  tabChange(index: number) {
    this.selectedIndex = index;
  }

  typeChange() {
  }

  toProviderDetails() {
    console.log('toProviderDetails:')
  }
  
  removeProvider() {
    console.log('removeProvider:')
  }

  showTenantModal(type) {
    this.modal.tenantModal({
      tenant: this.details,
      type
    }).subscribe(argu => {
      if (type === this.tenantActionTypes.remove) {
        this.router.navigate(['../']);
      } else {
        this.fetchData();
      }
    });
  }

  showTruthManagementModal() {
    this.modal.truthManagement({
      tenant: this.details,
    }).subscribe(argu => {
      // this.fetchData();
    });
  }

  showVisitManagementModal(type) {
    this.modal.tenantModal({
      tenant: this.details,
      type
    }).subscribe(argu => {
      if (type === this.tenantActionTypes.remove) {
        this.router.navigate(['../']);
      } else {
        this.fetchData();
      }
    });
  }

  showAuthProviderModal(type, provider) {
    this.modal.AuthProvider(provider, type)
      .subscribe(argu => {
        if (type === 'details') {
          return;
        } else {
          this.fetchData(); // TODO: seperate the api request
        }
      });
  }
}
