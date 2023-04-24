import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import {
  ContentChild,
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from './auth.service';

@Injectable({
  providedIn: 'root'

})
export class AuthInterceptorService {

  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    if (request.body instanceof File) {
      return next.handle(request);
    }

    if(request.body instanceof FormData){      
      request = request.clone({
        setHeaders:{
          'Accept': '*/*',
          Authorization: `${this.auth.getToken()}`
        } ,
           
      });
    }
    else{
      request = request.clone({
        setHeaders:{
          'Content-Type': "application/json",
          'Accept': '*/*',
          Authorization: `Bearer ${this.auth.getToken()}`
        } ,
           
      });
    }
    
    return next.handle(request);
  }

}
