import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as path from 'path-browserify';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
    });
  }

  private formatErrors( error: any ) {
    let data;

    try {
      data = error && error.error;
    } catch (err) {
      data = { error: 'fail to parse' };
    }

    return observableThrowError(data);
  }

  makeUrl(url) {
    return path.join(environment.apiUrl, url);
  }

  setHttpParams(params): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).map((key) => {
      if (params[key] !== '' && params[key] !== undefined) {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    return httpParams;
  }

  get(urlPath: string, params: Object = {}): Observable<any> {
    return this.http.get(this.makeUrl(urlPath), {
      headers: this.headers,
      params: this.setHttpParams(params)
    })
    .pipe(
      catchError(this.formatErrors),
      map(data => data),
    );
  }

  put(urlPath: string, body: Object = {}): Observable<any> {
    return this.http.put(
      this.makeUrl(urlPath),
      JSON.stringify(body),
      {headers: this.headers},
    ).pipe (
      catchError(this.formatErrors),
    );
  }

  post(urlPath: string, body: Object = {}): Observable<any> {
    return this.http.post(
      this.makeUrl(urlPath),
      JSON.stringify(body),
      {headers: this.headers},
    ).pipe(
      catchError(this.formatErrors),
    );
  }

  delete(urlPath): Observable<any> {
    return this.http.delete(
      this.makeUrl(urlPath),
      {headers: this.headers},
    ).pipe(
      catchError(this.formatErrors),
    );
  }
}

