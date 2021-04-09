import { Injectable } from '@angular/core';
import { Post } from '../../entities/Post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any>{
    return this.http
      .get<{ items: Post[] }>(
        'http://localhost:8280/posts'
      )
      .pipe(
        map(posts => posts || [])
      );
  }

  // public addPost(post: Post): void {
  //   this.posts.push(post);
  // }
  //
  // public deletePost(id: any): void {
  //   this.posts = this.posts.filter(item => item.id !== id);
  // }
  //
  // public editPost(selectedPost: Post): void {
  //   const post = this.posts.find(item => item.id === selectedPost.id);
  //   const index = this.posts.indexOf(post);
  //   this.posts[index] = selectedPost;
  // }
}
