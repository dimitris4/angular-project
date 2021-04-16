import { tassign } from 'tassign';
import { UserActions } from '../actions/UserActions';
import { UserState } from '../Store';

const INITIAL_STATE: UserState = {loggedInUser: undefined, token: ''};

export function usersReducer(state: UserState = INITIAL_STATE, action: any) {
 switch (action.type) {
    case UserActions.SIGNED_UP:
        return tassign(state, {
            loggedInUser: action.payload.user, 
            token: action.payload.token
        });

    default: 
        return state;
 }
}
