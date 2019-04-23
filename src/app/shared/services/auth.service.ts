import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

export class User {
  name = '';
  tenant = '';
}

export class LoginInfo {
  name = '';
  tenant = '';
  password = '';
  username = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser: User = new User();

  constructor(
    private api: ApiService,
  ) { }

  isLoggedIn() {
    return this.api.get('sessions/current');
  }

  setToken (response: any) {
    this.currUser.name = response.name;
    this.currUser.tenant = response.details.tenant;
  }

  login(formValue: LoginInfo) {
    const header = new HttpHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    return this.api.postEncode('login', formValue, header);
  }

  logout() {
    return this.api.postEncode('logout');
  }

  purgeAuth() {
    this.currUser = new User();
  }
}
