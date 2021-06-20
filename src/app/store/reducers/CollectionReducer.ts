import { CollectionState } from '../Store';
import { CollectionActions } from '../actions/CollectionActions';
import { tassign } from 'tassign';

const INITIAL_STATE: CollectionState = { collections: [] };

export function collectionReducer(state: CollectionState = INITIAL_STATE, action: any): CollectionState {
  switch (action.type) {
    case CollectionActions.READ_COLLECTIONS:
      return tassign(state, { collections: action.payload});
    // case PostActions.UPDATE_POST:
    //   const newArray = [...state.posts]; // copy of the array.
    //   const index = state.posts.findIndex(post => post.id === action.payload.id);
    //   newArray[index] = action.payload;
    //   return tassign(state, {posts: newArray});
    case CollectionActions.ADD_COLLECTION:
      return tassign(state, { collections: [...state.collections, action.payload]});
    // case PostActions.DELETE_POST:
    //   return { posts: state.posts.filter(post => post.id !== action.payload.id) };
    default:
      return state;
  }
}
