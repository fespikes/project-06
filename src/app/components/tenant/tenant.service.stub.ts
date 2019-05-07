import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ApiService } from 'app/shared';


@Injectable({
  providedIn: 'root'
})
export class TenantServiceStub {

  constructor(
    private api: ApiService,
  ) {}

  getTenants(filter: any = {}, isTenant?): Observable<any>{
    if (isTenant) {
      return of({"name":"demo","type":"PRIVATE","attributes":{"what":"is"},"createTime":1554866015189,"description":"desc"});
    } else {
      return this.tenantAccess('get', filter);
    }
  }

  tenantAccess(method, body?) {
    return this.api[method](`tenant-access`, body);
  }

  getTenantDetails(accesses) {
    let length = accesses.length;
    let names = accesses.reduce((acc, cur, idx) => {
        return acc + 'tenantName=' + cur.tenantName + ((idx + 1) < length ? '&' : '');
    }, '');
    return this.api.get(`tenants?` + names);
  }

  tenantMaintain(name, method: string/*'get'|'post'|'put'|'delete' */, body?): Observable<any>{
    const part = (method === 'post' ? '' : `/${name}`);
    return this.api[method](`tenants${part}`, body)
  }

  fetchProviders(tenant, filter?): Observable<any>{
    return of({
      body: [{
        attributes: {admin: "123", demo: "123"},
        providerId: "demo-provider",
        tenant: "demo",
        type: "DUMMY"
      }]
    });;
  }

  fetchProviderTypes(): Observable<any>{
    return of(["GUARDIAN"]);
  }

  providerMaintain(name, method: string, body?): Observable<any>{
    const part = (method === 'post' ? '' : `/${body.providerId}`);
    return this.api[method](`tenants/${name}/providers${part}`, body)
  }

  oAuthClients(tenantName, method?, body?, clientId?): Observable<any>{
    return of({body: [
      {
        accessTokenValiditySeconds: 600,
        additionalInfo: {},
        appName: "oauth-client-1",
        clientId: "oauth-client-1",
        clientSecret: "[protected]",
        redirectUris: ["http://localhost:8013/oauth-client-1/secret", "http://localhost:8013/oauth-client-1/passthrough"],
        tenant: "demo",
        type: "CONFIDENTIAL"
      }
    ]});;
  }

  fetchAccessToken(clientId, filter): Observable<any>{
    return of({body: []});
  }

  refreshClientSecret(tenantName, clientId) {
    return this.api.put(`tenants/${tenantName}/clients/${clientId}/secret`)
  }

  trusts(method, body?) {
    return this.api[method](`trusts`, body)
  }

}
