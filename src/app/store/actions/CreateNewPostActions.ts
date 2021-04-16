import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';

@Injectable({ providedIn: 'root'})
export class CreateNewPostActions {

  constructor(private ngRedux: NgRedux<AppState>) {}

  static CREATE_POST = 'CREATE_POST';
  static CONFIRM_CREATE_POST = 'CONFIRM_CREATE_POST';


  // addPost(newPost: Post): void {
  //   this.ngRedux.dispatch({
  //     type: PostActions.ADD_POST,
  //     payload: newPost
  //   });
  // }
  //
  // updatePost(updatedPost: Post): void {
  //   this.ngRedux.dispatch({
  //     type: PostActions.UPDATE_POST,
  //     payload: updatedPost
  //   });
  // }
  //
  // deletePost(updatedPost: Post): void {
  //   console.log('inside the action', updatedPost);
  //   this.ngRedux.dispatch({
  //     type: PostActions.DELETE_POST,
  //     payload: updatedPost
  //   });
  // }
}
