import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { Post } from 'src/app/entities/Post';
import {PostsService} from '../../posts/service/posts.service';

@Injectable({ providedIn: 'root'})
export class PostActions {

  constructor(private ngRedux: NgRedux<AppState>, private postService: PostsService) {}

  static ADD_POST = 'ADD_POST';
  static UPDATE_POST = 'UPDATE_POST';
  static DELETE_POST = 'DELETE_POST';
  static READ_POSTS = 'READ_POSTS';

  readPosts(): void {
    this.postService.readPosts()
      .subscribe((result: any) => {
      const posts: Post[] = [];
      if (result) {
        for (const [key, value] of Object.entries(result)) {
          const item: any = value;
          item.id = key;
          posts.push(item as Post);
        }
      }
      console.log(posts);
      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: posts
      });
    });
  }

  addPost(newPost: Post): void {
    this.postService.savePost(newPost)
      .subscribe((result: any) => {
      console.log('result from saving');
      console.log(result);
      // newPost.id = result.name;
      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
      });
    });
  }

  updatePost(updatedPost: Post): void {
    this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
    });
  }

  deletePost(updatedPost: Post): void {
    console.log('inside the action', updatedPost);
    this.ngRedux.dispatch({
      type: PostActions.DELETE_POST,
      payload: updatedPost
    });
  }
}
