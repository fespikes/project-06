import { Injectable } from '@angular/core';

import { ApiService, session } from 'app/shared';
// TODO: get it from api of enums
import { oAuthPrivacyTypes } from 'app/components/tenant/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private api: ApiService
  ) { }

  fetchConstants() {
    session.oAuthPrivacyTypes = oAuthPrivacyTypes
  }
}
