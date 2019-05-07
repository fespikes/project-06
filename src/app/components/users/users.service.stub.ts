import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceStub {

  users(method, params): Observable<any>{
    let url = `users`;
    switch (method) {
      case 'delete':
        return of({});
      case 'put':
        return of({});
      case 'reset-pwd':
        return of({});
      default:
        break;
    }
    return of({
      "body":[
        {"username":"admin","email":"admin@Federation","createTime":1554866015394,"roles":["ROLE_FED_ADMIN"]}
      ],
      "pageSize":10,
      "pageNumber":1,
      "totalPageNumber":9,
      "itemCount":10,
      "totalItemCount":0
      });
  }

}



