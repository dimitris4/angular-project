import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AppState } from './store/Store';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

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

  // saveSomething(something: string): any {
  //   const token = this.ngRedux.getState().users.token;
  //   const url = 'https://kvalifik-1ac56-default-rtdb.firebaseio.com/somethings.json?auth=' + token;
  //   return this.http.post(url, {something}, this.getHttpOptions());
  //   // "https://<DATABASE_NAME>.firebaseio.com/users/ada/name.json?auth=<ID_TOKEN>"
  // }

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
}
