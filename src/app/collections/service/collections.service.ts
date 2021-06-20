import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {Collection} from '../../entities/Collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService extends ApiService {

  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    super();
  }

  readCollections(): Observable<ArrayBuffer> {
    const url = 'https://cbsstudents-b88bf-default-rtdb.firebaseio.com/collections.json?auth=' + this.token;
    return this.http.get(url, this.getHttpOptions());
  }

  saveCollection(collection: Collection): Observable<ArrayBuffer> {
    const url = 'https://cbsstudents-b88bf-default-rtdb.firebaseio.com/collections.json?auth=' + this.token;
    return this.http.post(url, collection, this.getHttpOptions());
  }

  // updatePost(updatedPost: Post) {
  //   const url = `https://cbsstudents-b88bf-default-rtdb.firebaseio.com/posts/${updatedPost.id}.json?auth=${this.token}`;
  //   return this.http.patch(url, updatedPost, this.getHttpOptions());
  // }
}
