import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {ApiService} from 'app/shared';
// import {isProduction} from 'app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private api: ApiService,
  ) {}

  captchaUrl() {
    return this.api.makeUrl(`login/captcha?v=${Math.random()}`, '' );
    // return this.api.makeUrl(`login/captcha?v=${Math.random()}`, isProduction ? '' : 'federation-server');
  }

  sendRegisterLink() {
    return of({});
  }


}
