import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { AuthService} from '../../auth.service';
import { User } from 'src/app/entities/User';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { ErrorActions } from './ErrorActions';
import {ServerError} from '../../entities/ServerError';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class UserActions {

  static SIGNED_UP = 'SIGNED_UP';
  static LOG_IN = 'LOG_IN';
  static SAVE_SOMETHING = 'SAVE_SOMETHING';
  public errorMessage;

  constructor(private ngRedux: NgRedux<AppState>,
              private authService: AuthService,
              private errorActions: ErrorActions) { }


  // saveSomething(something: string): void {
  //   this.authService.saveSomething(something).subscribe((res: any) => {
  //     console.log(res);
  //   });
  // }

  signup(email: string, password: string): void {
    this.authService
      .signup(email, password)
      .pipe(
        catchError((error) => {
          const serverError: ServerError = error.error.error;
          this.errorActions.addError(serverError);
          return throwError(serverError);
        }))
      .subscribe((res: any) => {
        const user: User = {
          id: res.localId,
          email,
          signupDate: new Date()
        } as User;
        this.ngRedux.dispatch({
          type: UserActions.SIGNED_UP,
          payload: {user, token: res.idToken, authError: this.errorMessage}
        });
        this.errorActions.addError({message: ''});
      });
  }

  login(username: string, password: string): void {
    this.authService
      .login(username, password)
      .pipe(
        tap(data => console.log('server data: ', data)),
        catchError((error: HttpErrorResponse) => {
          const serverError: ServerError = error.error.error;
          this.errorActions.addError(serverError);
          return throwError(serverError);
        })
      )
      .subscribe(response => {
        this.ngRedux.dispatch({
          type: UserActions.LOG_IN,
          payload: response
        });
        // if the login is successful, then the error is an empty string
        this.errorActions.addError({message: ''});
      });
  }
}
