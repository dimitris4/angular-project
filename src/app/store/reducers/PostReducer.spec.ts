declare var require: any;

const deepFreeze: any = require('deep-freeze');
import { postsReducer } from './PostReducer';
import * as types from '../actions/PostActions';
import { Post } from '../../entities/Post';

describe('posts reducer', () => {

  it('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual({ posts: [] });
  });

  it('Add a new post to empty posts array', () => {
    // Arrange
    const oldState = { posts: [] };
    const newPost = {
      id: '123',
      createdDate: new Date(2021, 1, 2),
      title: 'Is there life out there',
      text: 'Something',
      collections: [],
      status: 'PUBLISHED'
    };
    deepFreeze(oldState);
    // const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };
    const actionObj = { type: 'ADD_POST', payload: newPost };

    // Act
    const result = postsReducer(oldState, actionObj);

    // Assert (expect)
    expect(result.posts).toHaveSize(oldState.posts.length + 1);
    expect(result.posts[result.posts.length - 1]).toEqual(newPost);
  });

  it('Add a new post to non-empty posts array', () => {
    // Arrange, Act, Assert

    // Arrange
    const oldState = { posts: [] };
    const newPost: Post = {
      id: '123',
      createdDate: new Date(2021, 1, 2),
      title: 'Is there life out there',
      text: 'Something',
      collections: [],
      status: 'PUBLISHED'
    };
    deepFreeze(oldState);
    const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };

    // Act
    const result = postsReducer(oldState, actionObj);

    // Assert (expect)
    expect(result.posts).toHaveSize(oldState.posts.length + 1);
    expect(result.posts[result.posts.length - 1]).toEqual(newPost);
  });

  it('update a post in the posts array', () => {
    const oldState = { posts: [] };
    const updatedPost: Post = {
      id: '1',
      createdDate: new Date(2021, 1, 5),
      title: 'Is there life out there',
      text: 'Something1',
      collections: [],
      status: 'PUBLISHED'
    };

    deepFreeze(oldState);

    const actionObj = { type: types.PostActions.UPDATE_POST, payload: updatedPost };

    // Act
    const result = postsReducer(oldState, actionObj);
    const post = result.posts.find(x => x.id === updatedPost.id);
    // Assert (expect)
    console.log(result.posts.find(x => x.id === updatedPost.id));
    expect(post.text).toEqual('Something1');
    // expect(result.posts.find( i => i.id === updatedPost.id)).toEqual(updatedPost);
  });

  it('delete a post from the posts array', () => {
    const oldState = { posts: [] };
    const updatedPost: any = {
      id: '1'
    };

    deepFreeze(oldState);

    const actionObj = { type: types.PostActions.DELETE_POST, payload: updatedPost };

    // Act
    const result = postsReducer(oldState, actionObj);
    expect(result.posts.length).toEqual(oldState.posts.length - 1);
  });
});
