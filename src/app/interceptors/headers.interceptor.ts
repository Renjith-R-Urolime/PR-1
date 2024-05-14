import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../modules/auth';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCognitoUser();
    const accessToken = currentUser?.getSignInUserSession()?.getIdToken()?.getJwtToken();

    let accountId = this.authService.getAccountIdFromHost();

    if(environment.local){
      accountId = 'dev'
    }

    if(accessToken){
      request = request.clone({
        setHeaders: {
          ...( accountId ? { 'client': accountId } : {} ),
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}