import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, catchError, throwError } from "rxjs";
import { UserService } from "../services/user.service";
import { take } from "rxjs/operators"
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.userData.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) next.handle(req);

        const modifiedReq = req.clone({ headers: new HttpHeaders().set('Authorization', 'Bearer ' + user?.token) });
        return <Observable<HttpEvent<any>>>next.handle(modifiedReq)
          .pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized) {
              this.userService.logout();
            }
            return throwError(error);
          }))
      })
    )
  }
}
