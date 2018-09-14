import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(this.getAuthReq(req)).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.auth.refreshToken().pipe(
            switchMap(() => next.handle(this.getAuthReq(req))),
            catchError(error => {
              this.router.navigate(['/login']);
              return of(error);
            })
          );
        }

        return of(err);
      })
    );
  }

  private getAuthReq(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: { Authorization: this.auth.getAuthToken() }
    });
  }
}
