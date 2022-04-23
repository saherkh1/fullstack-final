import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import store from '../redux/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    if(store.getState().authState.user) {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + store.getState().authState.user.token
            }
        });
    }
    return next.handle(request);
  }
}
