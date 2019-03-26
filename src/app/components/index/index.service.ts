import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
