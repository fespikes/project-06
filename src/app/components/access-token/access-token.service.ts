import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  constructor(
    private api: ApiService,
  ) { }

  tokens(method, params, header?): Observable<any>{
    return this.api[method](`tokens`, params, header);
  }

  tokenRefreshTask(method, task?) {
    let part;
    switch (method) {
      case 'post':
        part = '';
        break;
      case 'get':
        part = '';
        break;
      case 'delete':
      case 'put':
        part = `/${task.name}`;
        break;
      default:
        break;
    }
    const url = `token-refresh-tasks${part}`;
    if (method === 'delete') {
      return this.api[method](url);
    }
    return this.api[method]( `token-refresh-tasks${part}`, task);
  }

}
