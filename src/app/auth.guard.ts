import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngRedux: NgRedux<AppState>,
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('in the auth guard ', this.authService.isLoggedIn);
    if (this.authService.isLoggedIn !== true) {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['login']);
    }
    return true;
  }

}
