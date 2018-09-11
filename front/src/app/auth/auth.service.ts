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
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(this.hasToken() || false);

  constructor(
    private http: Http,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(loginData) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', `${environment.appId}`);

    const headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization:
        'Basic ' + btoa(`${environment.appId}:${environment.appSecret}`)
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(`${environment.apiUrl}/oauth/token`, params.toString(), options)
      .pipe(
        map(res => res.json()),
        tap(res => {
          this.saveToken(res);
          this.router.navigate(['/cv/my']);
          this.isAuthenticated.next(true);
        })
      );
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + 1000 + token.expires_in;

    this.cookieService.set('access_token', token.access_token, expireDate);
  }

  getAuthToken() {
    return 'Bearer ' + this.cookieService.get('access_token');
  }

  hasToken() {
    return this.cookieService.check('access_token');
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
    this.isAuthenticated.next(false);
    this.cookieService.delete('access_token', '/');
    this.router.navigate(['/login']);
  }
}
