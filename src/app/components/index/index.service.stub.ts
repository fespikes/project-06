import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class IndexServiceStub {

  getProfile(userName): Observable<any>{
    return of({});
  }

  changePWD(username, params) {
    return of({});
  }

  sendLink(method = 'post', params) {
    return of({});
  }

}
