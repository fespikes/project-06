import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { TuiMessageService  } from 'tdc-ui';

// import { federation_server } from 'app/shared/app.tokens';

@Injectable()
export class ApiService {
  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
      'credentials': 'include'
    });
  }

  constructor(
    private http: HttpClient,
    // @Optional() @Inject(federation_server) private federation_server,
    private message: TuiMessageService,
  ) {
    this.formatErrors = this.formatErrors.bind(this);
  }
  // TODO: to be optimized
  get(path: string, params: Object = {}, fs?): Observable<any> {
    return this.http.get(
      this.makeUrl(path, fs),
      this.setHttpParams(params)
    ).pipe(
      catchError(this.formatErrors),
      map((data) => data)); // TODO: check if the data has data['data'] inside
  }

  getWithHeader(path: string, body?, header?): Observable<any> {
    const obj = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
    };
    Object.keys(header).forEach(item => {
      obj[item] = header[item];
    })
    const headers = new HttpHeaders(obj);
    const url = this.makeUrl(path);

    return this.http.get(
      url,
      {
        headers: headers,
        // responseType: 'json',
        // withCredentials: false
      }
    ).pipe(
      catchError(this.formatErrors));
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
      catchError(this.formatErrors)
    );
  }

  getBlob(path: string, params: Object = {}, absolutePath = false): Observable<any> {
    return this.http.get(
      absolutePath ? path : this.makeUrl(path),
      this.setHttpParams(params, true, 'blob')
    ).pipe(
      catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, header?: object): Observable<any> {
    if (header) {
      const obj = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
      };
      Object.keys(header).forEach(item => {
        obj[item] = header[item];
      })
      const headers = new HttpHeaders(obj);

      return this.http.put(
        this.makeUrl(path),
        '{}',
        {headers: headers}
      ).pipe(
        catchError(this.formatErrors));
    }
    return this.http.put(
      this.makeUrl(path),
      JSON.stringify(body),
      { headers: this.headers }
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
    const url = this.rawUrl(urlPath);
    return this.http.post(
      url,
      this.setHttpParams(body, true).params.toString(),
      {headers},
    ).pipe(
      catchError(this.formatErrors),
    );
  }

  getEncode(path: string, params: Object = {}): Observable<any> {
    const url = this.rawUrl(path);
    return this.http.get(
      url,
      this.setHttpParams(params)
    ).pipe(
      catchError(this.formatErrors),
      map((data) => data));
  }

  delete(url, body, header?: object): Observable<any> {
    if (header) {
      const obj = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
      };
      Object.keys(header).forEach(item => {
        obj[item] = header[item];
      })
      const headers = new HttpHeaders(obj);

      return this.http.delete(
        this.makeUrl(url),
        {
          params: this.setHttpParams(body).params,
          headers: headers
        }
      ).pipe(
        catchError(this.formatErrors));
    }
    return this.http.delete(
      this.makeUrl(url),
      {
        params: this.setHttpParams(body).params,
        headers: this.headers
      }
    )
    .pipe(catchError(this.formatErrors));
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
    let data, msg;
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
    if (responseError.status === 401) {
      // hack here.
      return of({});
    }
    if (data) {
      msg = data.error_code+':'+data.error_description
    } else {
      msg = responseError.message;
    }
    this.message.error(msg); // TODO
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

  makeUrl(url, fs?) {
    if (/\/ops\/v1/g.test(url)) {
      return url;
    }
    return this.join(fs || environment.apiUrl, url);
  }

  rawUrl(url) {
    return this.join(environment.shim, url);
  }

  join(...parts) {
    const separator = '/';
    const replace   = new RegExp(separator + '{1,}', 'g');
    return parts.join(separator).replace(replace, separator);
  }
}
