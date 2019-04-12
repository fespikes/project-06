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
    let url = `users`
    if (method === 'remove') {
      url = `users/${params.username}`;
      return this.api[method](url);
    }
    return this.api[method](url, params);
  }

}



