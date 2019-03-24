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

  getTenants(filter = {}): Observable<any>{
    return this.api.get(`tenant-access`, filter);
    // return this.api.get(`tenants`, filter);
  }

  tenantMaintain(name, method: string/*'get'|'post'|'put'|'delete' */, body?): Observable<any>{
    const part = (method === 'post' ? '' : `/${name}`);
    return this.api[method](`tenants${part}`, body)
  }

  fetchProviders(tenant): Observable<any>{
    return this.api.get(`tenants/${tenant}/providers`)
  }

  providerMaintain(name, method: string, body?): Observable<any>{
    const part = (method === 'post' ? '' : `/${body.providerId}`);
    return this.api[method](`tenants/${name}/providers${part}`, body)
  }

  fetchClients(tenant): Observable<any>{
    return this.api.get(`tenants/${tenant}/clients`)
  }



  
}
