import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AppState } from './store/Store';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {User} from "./entities/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  userData: any;

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>,
              public router: Router, public ngZone: NgZone) {
    super();
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  saveUserInfo(user: User, idToken): any {
    const url = 'https://cbsstudents-b88bf-default-rtdb.firebaseio.com/users.json?auth=' + idToken;
    return this.http.post(url, user, this.getHttpOptions());
  }

  signup(email: string, password: string): any {
    const apiKey = 'AIzaSyA1uscUFgQBDJd1hLxiqjDacNPmFfhXBzs';
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
    return this.http.post(url, {email, password, returnSecureToken: true},
      this.getHttpOptions());
  }

  login(username: string, password: string): any {
    const apiKey = 'AIzaSyA1uscUFgQBDJd1hLxiqjDacNPmFfhXBzs';
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
    return this.http.post(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions());
  }

  // getUsers() {
  //   const apiKey = 'AIzaSyA1uscUFgQBDJd1hLxiqjDacNPmFfhXBzs';
  //   const url = https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
  // }
}
