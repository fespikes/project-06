import { Injectable } from '@angular/core';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsServiceStub {

  tenantModal(argu) {
    return of(true)
  }

  truthManagement(argu?) {
    return of(true)
  }

  visitManagement(argu?) {
    return of(true)
  }

  AuthProvider(provider, type?, tenantName?) {
    return of(true)
  }

  authClient(client?, type?, tenantName?, returned?, modalFunction?, fetchOAuthClients?) {
    return of(true)
  }

  accessToken(oAuthClient, type?) {
    return of(true)
  }
}
