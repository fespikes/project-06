import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private api: ApiService,
  ) {}

  users(method, params): Observable<any>{
    let url = `users`;
    switch (method) {
      case 'delete':
        url = `users/${params.username}`;
        return this.api[method](url);
      case 'put':
        url = `users/${params.username}`;
        return this.api[method](url, params);
      case 'reset-pwd':
        url = `users/${params.username}/password`;
        return this.api[method](url, params);
      default:
        break;
    }
    return this.api[method](url, params);
  }

}



