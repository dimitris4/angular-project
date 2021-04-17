import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { AuthService} from './../../auth.service';
import { User } from 'src/app/entities/User';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class UserActions {

  constructor(private ngRedux: NgRedux<AppState>, private authService: AuthService) {}

  static SIGNED_UP = 'SIGNED_UP';
  static LOG_IN = 'LOG_IN';

  signup(username: string, password: string): void {
    this.authService
      .signup(username, password)
      .subscribe((res: any) => {
        console.log('after getting a reponse');
        console.log(res);
        const user: User = {
          id: res.localId,
          username, email: username,
          signupDate: new Date()
        } as User;

        this.ngRedux.dispatch({
          type: UserActions.SIGNED_UP,
          payload: {user, token: res.idToken}
      });
    });
  }

  login(username: string, password: string): void {
    this.authService
      .login(username, password)
      .subscribe(res => {
      this.ngRedux.dispatch({
        type: UserActions.LOG_IN,
        payload: {username, password}
      });
      })
      .catch((err: HttpErrorResponse) => {
          // simple logging, but you can do a lot more, see below
          console.error('An error occurred:', err.error);
    });
  }

}
