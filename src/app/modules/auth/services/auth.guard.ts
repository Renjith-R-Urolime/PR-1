import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.authService.isloggedIn()
    const accountId = this.authService.getAccountIdFromHost();

    if(isAuth && accountId) {
      return true;
    }

    if(isAuth && accountId !== null){
        if(environment.live){
          window.location.href = `https://${accountId}.${environment.appUrl}/${state.url}`;
        }else{
          window.location.href = `http://${accountId}.${environment.appUrl}/${state.url}`;
        }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'])

    // this.authService.logout();
    return false;
  }
}
