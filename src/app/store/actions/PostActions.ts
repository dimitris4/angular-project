import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { Post } from 'src/app/entities/Post';

@Injectable({ providedIn: 'root'})
export class PostActions {

  constructor(private ngRedux: NgRedux<AppState>) {}

  static ADD_POST = 'ADD_POST';
  static UPDATE_POST = 'UPDATE_POST';

  addPost(newPost: Post): void {
    this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
    });
  }

  updatePost(updatedPost: Post): void {
    this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
    });
  }
}
