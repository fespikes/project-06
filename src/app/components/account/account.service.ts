import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {ApiService} from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private api: ApiService,
  ) {}

  captchaUrl() {
    return this.api.makeUrl('federation-server', 'login/captcha');
  }

  sendRegisterLink() {
    return of({});
  }


}
