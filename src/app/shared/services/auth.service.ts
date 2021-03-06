import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { session } from 'app/shared/utils';
import { adminRoles } from 'app/components/tenant/tenant.model';
import {isProduction} from 'app/shared/utils';

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
export class AuthService {

  currUser: User = new User();
  redirectUrl: string;

  constructor(
    private api: ApiService,
  ) { }

  isLoggedIn() {
    return this.api.getEncode('sessions/current');
  }

  setToken (response: any) {
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
    const header = new HttpHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    return this.api.post('login', formValue);
  }

  logout() {
    return this.api.rawUrl('logout');
  }

  purgeAuth() {
    this.currUser = new User();
  }
}
