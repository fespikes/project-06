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
    const part = method === 'post' ? '' : `/${task.name}`;
    const url = `token-refresh-tasks${part}`;
    if (method === 'delete') {
      return this.api[method](url);
    }
    return this.api[method]( `token-refresh-tasks${part}`, task);
  }


}
