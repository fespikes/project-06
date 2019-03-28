import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'app/shared';


@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(
    private api: ApiService,
  ) {}

  getTenants(filter: any = {}, isTenant?): Observable<any>{
    if (isTenant) {
      return this.api.get(`tenants/${filter.tenant}`);
    } else {
      return this.api.get(`tenant-access`, filter);
    }
  }

  getTenantDetails(tenantNameObj) {
    return this.api.get(`tenants`, tenantNameObj);
  }
  getTenantsByTenantName(name) {
    return this.api.get(`tenants/${name}`);
  }

  tenantMaintain(name, method: string/*'get'|'post'|'put'|'delete' */, body?): Observable<any>{
    const part = (method === 'post' ? '' : `/${name}`);
    return this.api[method](`tenants${part}`, body)
  }

  fetchProviders(tenant, filter?): Observable<any>{
    return this.api.get(`tenants/${tenant}/providers`, filter);
  }

  fetchProviderTypes(): Observable<any>{
    return this.api.get(`provider-types`)
  }

  providerMaintain(name, method: string, body?): Observable<any>{
    const part = (method === 'post' ? '' : `/${body.providerId}`);
    return this.api[method](`tenants/${name}/providers${part}`, body)
  }

  fetchClients(tenant): Observable<any>{
    return this.api.get(`tenants/${tenant}/clients`)
  }



  
}
