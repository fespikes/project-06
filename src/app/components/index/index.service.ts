import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(
    private api: ApiService,
  ) { }

  getProfile(userName): Observable<any>{
    return this.api.get(`users/${userName}`);
  }

  changePWD(username, params) {
    return this.api.put(`users/${username}/password`, params)
  }

  sendLink(method = 'post', params) {
    // return this.api.post(``);
    return of({});
  }

}
