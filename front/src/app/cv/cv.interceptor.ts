import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { finalize, tap, delay } from 'rxjs/operators';
import { AppLoaderService } from '../app-loader.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private appLoaderService: AppLoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    setTimeout(() => {
      this.appLoaderService.loading$.next(true);
    }, 0);

    return next.handle(req).pipe(
      finalize(() => {
        setTimeout(() => {
          this.appLoaderService.loading$.next(false);
        }, 500);
      })
    );
  }
}
