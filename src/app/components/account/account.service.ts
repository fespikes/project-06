import { Injectable } from '@angular/core';

import {ApiService} from 'app/shared';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private api: ApiService,
  ) {}

  sendRegisterLink() {

  }


}
