import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { ToastrService } from "ngx-toastr";
import { Observable, tap } from "rxjs";
// import { SharedService } from "../services/shared.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  skipToastrMessage = false;

  constructor(
    // private toastrService: ToastrService,
    // private sharedService: SharedService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (error: HttpErrorResponse) => {
          for (const [key, value] of request.headers["headers"].entries()) {
            if (key === "not-intercepted") {
              this.skipToastrMessage = true;
            }
          }

          if (!this.skipToastrMessage || error?.error.code === 1025) {
            // this.toastrService.error("", error?.error?.message);
            this.router.navigateByUrl("/");
          }
        },
      })
    );
  }
}
