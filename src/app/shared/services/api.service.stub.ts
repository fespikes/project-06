import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { TuiMessageService  } from 'tdc-ui';

// import { federation_server } from 'app/shared/app.tokens';

@Injectable()
export class ApiServiceStub {
  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
      'credentials': 'include'
    });
  }
  get(path: string, params: Object = {}, fs?): Observable<any> {
    return of({});
  }

  getWithHeader(path: string, body?, header?): Observable<any> {
    return of({});
  }

  getAll(path: string, params: Object = {}): Observable<any> {
    return this.get(path, params);
  }

  getPreview(path: string, params: Object = {}): Observable<any> {
    return this.get(path, params);
  }

  getText(path: string, params: Object = {}): Observable<any> {
    return of({});
  }

  getFile(path: string, params: Object = {}): Observable<any> {
    return of({});
  }

  getBlob(path: string, params: Object = {}, absolutePath = false): Observable<any> {
    return of({});
  }

  put(path: string, body: Object = {}, header?: object): Observable<any> {
    return of({});
  }

  post(path: string, body: Object = {}): Observable<any> {
    return of({});
  }

  // only used in login/logout for now
  postEncode(urlPath: string, body: Object = {}, headers = this.headers): Observable<any> {
    return of({});
  }

  getEncode(path: string, params: Object = {}): Observable<any> {
    return of({});
  }

  delete(url, body, header?: object): Observable<any> {
    return of({});
  }
  patch(path, body: Object = {}): Observable<any> {
    return of({});
  }

  rawUrl(url) {
    return '';
  }
}
