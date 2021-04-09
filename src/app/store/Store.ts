import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { Post } from '../entities/Post';
import { postsReducer } from './reducers/PostReducer';

export class PostState {
    posts: Post[];
}
// export class EventState {
//     events: Event[];
// }

export class AppState {
    posts?: PostState;
    // events?: EventState;
}
export const rootReducer = combineReducers<AppState>({
    posts: postsReducer,
    // events: eventsReducer,

    // router: routerReducer
});
