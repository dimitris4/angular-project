import { combineReducers } from 'redux';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { ServerError } from '../entities/ServerError';
import { postsReducer } from './reducers/PostReducer';
import { collectionReducer } from './reducers/CollectionReducer';
import { usersReducer } from './reducers/UserReducer';
import { errorReducer } from './reducers/ErrorReducer';
import { Collection } from '../entities/Collection';

export class PostState {
  posts: Post[];
}

export class CollectionState {
  collections: Collection[];
}

export class UserState {
  loggedInUser: User;
  token: string;
}

export class ErrorState {
  error: ServerError;
}

export class AppState {
    posts?: PostState;
    users?: UserState;
    errors?: ErrorState;
    collections?: CollectionState;
}

export const rootReducer = combineReducers<AppState>({
  posts: postsReducer,
  users: usersReducer,
  errors: errorReducer,
  collections: collectionReducer,
});
