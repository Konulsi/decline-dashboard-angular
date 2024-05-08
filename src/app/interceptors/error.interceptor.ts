import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  skipToastrMessage = false;

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (error: HttpErrorResponse) => {
          for (const [key, value] of request.headers['headers'].entries()) {
            if (key === 'not-intercepted') {
              this.skipToastrMessage = true;
            }
          }
          if (!this.skipToastrMessage || error?.error.code === 1025) {
            this.router.navigateByUrl('/');
          }
        },
      }),
    );
  }
}
