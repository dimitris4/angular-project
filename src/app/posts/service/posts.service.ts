import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store/Store';
import {Post} from '../../entities/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends ApiService {

  private token = localStorage.getItem('token');

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  readPosts(): Observable<ArrayBuffer> {
    const url = 'https://cbsstudents-b88bf-default-rtdb.firebaseio.com/posts.json?auth=' + this.token;
    return this.http.get(url, this.getHttpOptions());
  }

  savePost(post: Post): Observable<ArrayBuffer> {
    const url = 'https://cbsstudents-b88bf-default-rtdb.firebaseio.com/posts.json?auth=' + this.token;
    return this.http.post(url, post, this.getHttpOptions());
  }
}
