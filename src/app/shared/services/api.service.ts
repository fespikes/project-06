import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { TuiMessageService  } from 'tdc-ui';

import { federation_server } from 'app/shared/app.tokens';

@Injectable()
export class ApiService {
  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
    });
  }

  constructor(
    private http: HttpClient,
    @Optional() @Inject(federation_server) private federation_server,
    private message: TuiMessageService,
  ) {
    this.formatErrors = this.formatErrors.bind(this);
  }

  get(path: string, params: Object = {}): Observable<any> {
    return this.http.get(
      this.makeUrl(path),
      this.setHttpParams(params)
    ).pipe(
      catchError(this.formatErrors),
      map((data) => data)); // TODO: check if the data has data['data'] inside
  }

  getAll(path: string, params: Object = {}): Observable<any> {
    params['size'] = Math.pow(2, 31) - 1;
    params['page'] = 1;
    return this.get(path, params);
  }

  getPreview(path: string, params: Object = {}): Observable<any> {
    params['size'] = 3;
    params['page'] = 1;
    return this.get(path, params);
  }

  getText(path: string, params: Object = {}): Observable<any> {
    return this.http.get(
      this.makeUrl(path),
      this.setHttpParams(params, false, 'text')
    ).pipe(
      catchError(this.formatErrors));
  }

  getFile(path: string, params: Object = {}): Observable<any> {
    return this.http.get(
      this.makeUrl(path),
      this.setHttpParams(params, true, 'arraybuffer')
    ).pipe(
      catchError(this.formatErrors));
  }

  getBlob(path: string, params: Object = {}, absolutePath = false): Observable<any> {
    return this.http.get(
      absolutePath ? path : this.makeUrl(path),
      this.setHttpParams(params, true, 'blob')
    ).pipe(
      catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      this.makeUrl(path),
      JSON.stringify(body),
      { headers: this.headers },
    ).pipe(
      catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      this.makeUrl(path),
      JSON.stringify(body),
      { headers: this.headers },
    ).pipe(
      catchError(this.formatErrors));
  }

  // only used in login/logout for now
  postEncode(urlPath: string, body: Object = {}, headers = this.headers): Observable<any> {
    return this.http.post(
      this.makeUrl(urlPath),
      this.setHttpParams(body, true).params.toString(),
      {headers},
    ).pipe(
      catchError(this.formatErrors),
    );
  }

  postRaw(path: string, body: Object = {}, config: Object = {}): Observable<any> {
    return this.http.post(
      this.makeUrl(path),
      body,
      config,
    ).pipe(
      catchError(this.formatErrors));
  }

  delete(path, body: Object = null): Observable<any> {
    // httpClient delete 不能传body
    return this.http.request(
      'delete',
      this.makeUrl(path),
      {
        body,
        headers: this.headers,
      },
    ).pipe(
      catchError(this.formatErrors));
  }

  patch(path, body: Object = {}): Observable<any> {
    return this.http.patch(
      this.makeUrl(path),
      JSON.stringify(body),
      { headers: this.headers },
    ).pipe(
      catchError(this.formatErrors));
  }

  formatErrors(responseError: HttpErrorResponse) {
    let data;
    if (typeof responseError.error === 'string') {
      try {
        data = JSON.parse(responseError.error);
      } catch (err) {
        console.error('Fail to parse error', responseError.error);
        data = {error: 'fail to parse'};
      }
    } else {
      data = responseError.error;
    }
    this.message.error(data.error_code+':'+data.error_description); // TODO
    return observableThrowError(data);
  }

  setHttpParams(params, all?: boolean, responseType?) {
    const obj: any = {
      params: new HttpParams(),
      headers: this.headers,
    };
    const check = argu => argu !== null && typeof argu !== 'undefined';
    if (params) {
      Object.keys(params).map((key) => {
        if (check(params[key])) {
          obj.params = obj.params.append(key, params[key]);
        }
      });
    }

    if (all) { obj.observe = 'response'; }
    if (check(responseType)) { obj.responseType = responseType; }
    return obj;
  }

  makeUrl(url) {
    if (/\/ops\/v1/g.test(url)) {
      return url;
    }
    return this.join(this.federation_server || environment.apiUrl, url);
  }

  join(...parts) {
    const separator = '/';
    const replace   = new RegExp(separator + '{1,}', 'g');
    return parts.join(separator).replace(replace, separator);
  }
}
