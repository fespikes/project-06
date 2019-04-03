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
    return this.api[method](`users`, params);
  }

}



