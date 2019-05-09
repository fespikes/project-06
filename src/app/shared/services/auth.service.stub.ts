import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { session } from 'app/shared/utils';
import { adminRoles } from 'app/components/tenant/tenant.model';
import {isProduction} from 'app/shared/utils';
import { of } from 'rxjs';

export class User {
  name = '';
  tenant = '';
}

export class LoginInfo {
  tenant = '';
  password = '';
  username = '';
  captcha: '';
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceStub {

  public currUser: User = new User();
  redirectUrl: string;

  isLoggedIn() {
    return of({subscribe: () => {}});
  }

  setToken (response: any = {
      details: {},
      authorities: []
    }) {
    this.currUser.name = response.name;
    this.currUser.tenant = response.details.tenant;
    session.userName = response.name;
    session.isTenant = response.details.tenant !== 'FEDERATION';
    session.tenant = response.details.tenant;

    if (response.authorities) {
      session.isAdmin = response.authorities.some(item => {
          return adminRoles.indexOf(item.authority) > -1;
        }) ? 'true' : 'false';
      session.isFedAdmin = response.authorities.some(item => item.authority==='ROLE_FED_ADMIN') ? 'true' : 'false';
    }
  }

  login(formValue: LoginInfo) {
    return of({subscribe: () => {}});
  }

  logout() {
    return of({});
  }

  purgeAuth() {
    this.currUser = new User();
  }
}
