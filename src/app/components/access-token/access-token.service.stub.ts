import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenServiceStub {

  tokens(method, params, header?): Observable<any>{
    return of({
      body: [],
      itemCount: 10,
      pageNumber: 1,
      pageSize: 10,
      totalItemCount: 0,
      totalPageNumber: 8
    });;
  }

  tokenRefreshTask(method, task?) {
    return of({
      createTimestamp: 0,
      executionInterval: 3600000,
      lastExecutionTimestamp: 0,
      name: "task-1064140633-i91tTION",
      refreshTokenValue: "i91tnhtZzXONCIP8kB5W-FEDERATION",
      status: "SCHEDULED",
    })
  }

}
