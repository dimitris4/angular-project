import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getHttpOptions(): any{
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  signup(username: string, password: string): any {
    const apiKey = 'AIzaSyA1uscUFgQBDJd1hLxiqjDacNPmFfhXBzs';
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
    return this.http.post(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions());
  }

  login(username: string, password: string): any {
    const apiKey = 'AIzaSyA1uscUFgQBDJd1hLxiqjDacNPmFfhXBzs';
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
    return this.http.post(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions());
  }

}
