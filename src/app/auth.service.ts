import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  signup(username: string, password: string) {
    const apiKey = 'AIzaSyAKyWtjLqAyXzNnPnvZ_MlcEF3GSjKtHLI'; // THis is mine. Use your own please!
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
    
    return this.http.post(url, {email: username, password, returnSecureToken: true}, 
      this.getHttpOptions());
  }

}
