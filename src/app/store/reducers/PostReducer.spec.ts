import {Post} from '../../entities/Post';

declare var require: any;
const deepFreeze: any = require('deep-freeze');
import { postsReducer, posts } from './PostReducer';
import * as types from '../actions/PostActions';
import {PostState} from '../Store';

const newPost = { id: '132', createdDate: new Date(2021, 2, 2), title: 'New post for testing',
  text: 'Something', collections: [], status: 'PUBLISHED' };

const editedPost = { id: '1', createdDate: new Date(2021, 2, 2), title: 'Edited title',
  text: 'Something', collections: [], status: 'PUBLISHED' };

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual({ posts });
  });

  it('Add post', () => {
    const oldState = { posts };
    deepFreeze(oldState);
    const action = { type: types.PostActions.ADD_POST, payload: newPost };
    const result = postsReducer(oldState, action);
    expect(result.posts).toHaveSize(oldState.posts.length + 1);
  });

  it('Update post', () => {
    const oldState = { posts };
    deepFreeze(oldState);
    const action = { type: types.PostActions.UPDATE_POST, payload: newPost };
    const result = postsReducer(oldState, action);
    expect(result.posts).toHaveSize(oldState.posts.length + 1);
  });
});
