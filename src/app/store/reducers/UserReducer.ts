import { tassign } from 'tassign';
import { UserActions } from '../actions/UserActions';
import { UserState } from '../Store';
import {User} from '../../entities/User';

const INITIAL_STATE: UserState = {loggedInUser: undefined, token: 'empty'};

export function usersReducer(state: UserState = INITIAL_STATE, action: any): UserState {
  switch (action.type) {
    case UserActions.SIGN_UP:
      return tassign(state, {
        loggedInUser: action.payload.user,
        token: action.payload.token
      });

    case UserActions.LOG_IN:
      // creates a User object and stores it to the local storage
      const user: User = {id: action.payload.localId, email: action.payload.email};
      localStorage.setItem('user', JSON.stringify(user));
      // returns new users state
      return tassign(state, {
        loggedInUser: {id: action.payload.localId, email: action.payload.email},
        token: action.payload.idToken,
      });

    default:
      return state;
  }
}
