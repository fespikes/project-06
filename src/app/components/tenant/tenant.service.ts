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

  getTenantDetails(accesses) {
    let length = accesses.length;
    let names = accesses.reduce((acc, cur, idx) => {
        return acc + 'tenantName=' + cur.tenantName + ((idx + 1) < length ? '&' : '');
    }, '');
    return this.api.get(`tenants?` + names);
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

  oAuthClients(tenantName, method?, body?, clientId?): Observable<any>{
    let url = clientId ? `tenants/${tenantName}/clients/${clientId}`
      : `tenants/${tenantName}/clients`;
    return !!body ? this.api[method](url, body) : this.api[method](url);
  }

  fetchAccessToken(clientId, filter): Observable<any>{
    return this.api.get(`tokens?clientId=${clientId}&tokenSource=CLIENT_CRED`, filter);
  }

  refreshClientSecret(tenantName, clientId) {
    return this.api.put(`tenants/${tenantName}/clients/${clientId}/secret`)
  }

}
