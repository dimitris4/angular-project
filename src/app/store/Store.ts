import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { ServerError } from '../entities/ServerError'
import { postsReducer } from './reducers/PostReducer';
import { usersReducer } from './reducers/UserReducer';
import { errorReducer } from './reducers/ErrorReducer';

export class PostState {
  posts: Post[];
}

export class UserState {
  loggedInUser: User;
  token: string;
}

export class ErrorState {
  error: ServerError;
}

// export class EventState {
//     events: Event[];
// }

export class AppState {
    posts?: PostState;
    users?: UserState;
    errors?: ErrorState;
    // events?: EventState;
}

export const rootReducer = combineReducers<AppState>({
    posts: postsReducer,
    users: usersReducer,
    errors: errorReducer,
    // events: eventsReducer,

    // router: routerReducer
});
