import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {ApiService} from 'app/shared';
// import {isProduction} from 'app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceStub {

  captchaUrl() {
    return '/federation-server/login/captcha?v=0.4595084239776508';
  }

  sendRegisterLink() {
    return of({});
  }


}
