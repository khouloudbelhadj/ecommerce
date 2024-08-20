import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse,} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

const unallowedRequests = [
  '/user/registration',
  '/user/login',
  'user/logout'
];
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!unallowedRequests.includes(request.url.substring(`http://localhost:8080/`.length))) {
      const token = localStorage.getItem('token');
      if (token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          const isWhitelisted = !unallowedRequests.includes(request.url.substring(`http://localhost:8080/`.length));
          if (isWhitelisted) {
            this.router.navigate(['user/login']);
          }
        }
        return throwError(error);
      })
    );
  }
}