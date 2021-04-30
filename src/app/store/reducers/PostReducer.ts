import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from 'src/app/entities/Post';

const INITIAL_STATE: PostState = { posts: [] };

export function postsReducer(state: PostState = INITIAL_STATE, action: any): PostState {
  switch (action.type) {
    case PostActions.READ_POSTS:
      return tassign(state, {posts: action.payload});
    case PostActions.UPDATE_POST:
      const newArray = [...state.posts]; // copy of the array.
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      newArray[index] = action.payload;
      return tassign(state, {posts: newArray});
    case PostActions.ADD_POST:
      // return tassign(state, {posts: state.posts.concat(action.payload)});
      return tassign(state, {posts: [...state.posts, action.payload]});
    case PostActions.DELETE_POST:
      return { posts: state.posts.filter(post => post.id !== action.payload.id) };
    default:
      return state;
 }
}
