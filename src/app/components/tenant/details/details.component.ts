import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TuiMessageService } from 'tdc-ui';

import { TenantService } from '../tenant.service';
import { tenantActionTypes, oAuthPrivacyTypes } from '../tenant.model';
import { ModalsService } from '../modals.service';
import { getAttrsFromObj, ObjectToArray } from '../../../shared/utils';

@Component({
  selector: 'fed-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  @HostBinding('class.main') hostClass = true;
  loading = false;
  selectedIndex = 0;

  tenantActionTypes = tenantActionTypes;
  details: any = {};
  attrs: any[] = [];
  tenantName = '';

  providerTypes: any;
  oAuthPrivacyTypes = ObjectToArray(oAuthPrivacyTypes, true);

  providersFilter: any = {};
  oAuthClientFilter: any = {};

  providers: any;
  clients: any;
  refreshingClientSecret = false;

  constructor(
    private route: ActivatedRoute,
    private service: TenantService,
    private modal: ModalsService,
    private router: Router,
    private message: TuiMessageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.tenantName = params.get('name');
        this.fetchData();
    });
  }

  fetchData() {
    this.loading = true;
    const promises = [
      this.service.tenantMaintain(this.tenantName, 'get'),
      this.fetchProviders(),
      this.fetchOAuthClients(),
      this.service.fetchProviderTypes()
    ];
    combineLatest(promises)
      .subscribe(([details, providers, clients, providerTypes]) => {
        this.details = details;
        this.attrs = getAttrsFromObj(details.attributes);
        this.providers = providers.body;
        this.clients = clients.body;
        this.providerTypes = providerTypes;
        this.loading = false;
      });
  }

  fetchProviders($event?, val?, fresh?) {
    if (fresh) {
      this.service.fetchProviders(this.tenantName, this.providersFilter)
        .subscribe( res => {
          this.providers = res.body;
        });
    } else if (val) {
      this.providersFilter.type = $event;
    } else if($event) {
      this.providersFilter.searchValue = $event.target.value;
    } else {
      return this.service.fetchProviders(this.tenantName, this.providersFilter)
    }
  }

  fetchOAuthClients($event?, val?, fresh?) {
    if (fresh) {
      this.service.oAuthClients(this.tenantName, 'get', this.oAuthClientFilter)
        .subscribe( res => {
          this.clients = res.body;
        });
    } else if (val) {
      this.oAuthClientFilter.type = $event;
    } else if($event) {
      $event.target && (this.oAuthClientFilter.searchValue = $event.target.value);
    } else {
      return this.service.oAuthClients(this.tenantName, 'get', this.oAuthClientFilter);
    }
  }

  tabChange(index: number) {
    this.selectedIndex = index;
  }

  showTenantModal(type) {
    this.modal.tenantModal({
      tenant: this.details,
      type
    }).subscribe(argu => {
      if (type === this.tenantActionTypes.remove && argu) {
        this.service.tenantMaintain(this.details.name, 'delete')
          .subscribe(res => {
            this.message.success('删除成功');
            this.router.navigate(['../']);
          });
      } else {
        this.fetchData();
      }
    });
  }

  showTruthManagementModal() {
    this.modal.truthManagement({
      tenant: this.details,
    }).subscribe(argu => {
      this.fetchData();
    });
  }

  showVisitManagementModal(type?) {
    this.modal.visitManagement({
      tenantName: this.tenantName,  // 对当前进入的租户访问管理
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
    this.modal.AuthProvider(provider, type, this.tenantName)
      .subscribe(argu => {
        this.fetchProviders('', '', true);
        if (type === 'remove' && argu) {
          this.service.providerMaintain(this.tenantName, 'delete', {providerId: provider.providerId})
            .subscribe(res => {
              this.fetchData();
            });
        }
      });
  }

  /**
   * @description 
   * will emit when:
   * 1.register; 2.edit; 3.remove;
   * 4.show 'return' when registered; 5.show 'clientSecret'
   * @param type 
   * @param client 
   * @param returned 
   */
  showOAuthClientModal(type, client?, returned?) {
    this.modal.authClient(
      client,
      type,
      this.tenantName,
      returned,
      this.modal.authClient.bind(this.modal)
    ).subscribe(argu => {
      if (type === 'details') {
        return;
      } else if(type === 'remove' && argu) {
        this.refreshingClientSecret = true;
        this.service.oAuthClients(this.tenantName, 'delete', '', client.clientId)
        .subscribe( res => {
          this.fetchOAuthClients('', '', true);
          this.refreshingClientSecret = false;
        });
      }else {
        this.fetchOAuthClients('', '', true);
      }
    });
  }

  showAccessToken(oAuthClient, type) {
    this.modal.accessToken(oAuthClient, '')
      .subscribe(argu => {
        if (type === 'details') {
          return;
        } else {
          this.fetchData();
        }
      });
  }

  refresh(ele) {
    this.refreshingClientSecret = true;
    this.service.refreshClientSecret(this.tenantName, ele.clientId)
      .subscribe( res => {
        this.fetchOAuthClients();
        this.refreshingClientSecret = false;
        this.showOAuthClientModal('clientSecret', ele, {
          clientId: ele.clientId,
          clientSecret: res.clientSecret
        });
      });
  }

}
