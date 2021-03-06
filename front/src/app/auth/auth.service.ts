import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {
  RequestOptions,
  Request,
  RequestMethod,
  Http,
  Headers
} from '@angular/http';
import { Router } from '@angular/router';
import { of, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export enum GrandType {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token'
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject(
    JSON.parse(localStorage.getItem('current_user')) || null
  );
  isAuthenticated$ = this.currentUser$.pipe(
    map(user => !!user && this.hasToken())
  );

  constructor(private http: Http, private router: Router) {}

  login(loginData) {
    const { params, options } = this.requestBuilder(
      GrandType.PASSWORD,
      loginData
    );

    return this.http
      .post(`${environment.apiUrl}/oauth/token`, params.toString(), options)
      .pipe(
        map(res => res.json()),
        tap(res => {
          this.saveToken(res, loginData);
        })
      );
  }

  refreshToken() {
    if (
      !sessionStorage.getItem('login_data') ||
      !localStorage.getItem('current_user')
    ) {
      return throwError('no data in sessionStorage');
    }

    const loginData = JSON.parse(sessionStorage.getItem('login_data'));
    const refreshToken = JSON.parse(localStorage.getItem('current_user'))
      .refresh_token;

    const { params, options } = this.requestBuilder(
      GrandType.REFRESH_TOKEN,
      loginData,
      refreshToken
    );

    return this.http
      .post(`${environment.apiUrl}/oauth/token`, params.toString(), options)
      .pipe(
        map(res => res.json()),
        tap(res => {
          this.saveToken(res);
        }),
        catchError(err => {
          this.cleanup();
          return of(err);
        })
      );
  }

  saveToken(token, loginData?) {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('current_user', JSON.stringify(token));
    this.currentUser$.next(token);

    if (loginData) {
      sessionStorage.setItem('login_data', JSON.stringify(loginData));
    }
  }

  getAuthToken() {
    return 'Bearer ' + localStorage.getItem('access_token');
  }

  hasToken() {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    const headers = new Headers({
      Authorization: this.getAuthToken()
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(`${environment.apiUrl}/oauth/logout`, {}, options)
      .pipe(
        tap(() => {
          this.cleanup();
        })
      );
  }

  cleanup() {
    this.currentUser$.next(null);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private requestBuilder(
    grandType: GrandType,
    loginData: { username: string; password: string },
    refreshToken?: string
  ) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', grandType);
    params.append('client_id', `${environment.appId}`);
    if (grandType === GrandType.REFRESH_TOKEN && refreshToken) {
      params.append('refresh_token', refreshToken);
    }

    const headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization:
        'Basic ' + btoa(`${environment.appId}:${environment.appSecret}`)
    });
    const options = new RequestOptions({ headers: headers });

    return { params, options };
  }
}
