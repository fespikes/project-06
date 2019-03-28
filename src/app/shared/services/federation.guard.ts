import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FederationGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    this.auth.redirectUrl = url;
    // return observableOf(true);
    return this.auth.isLoggedIn().pipe(
      map ((token) => {
        if (token) {
          this.auth.setToken(token);
        }
        return true;
      }),
      catchError((error) => {
        this.router.navigate(['account/login']);
        return observableOf(false);
      })
    );
  }
}
