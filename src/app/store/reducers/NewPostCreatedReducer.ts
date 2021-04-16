import { tassign } from 'tassign';
import { AppState } from '../Store';
import { CreateNewPostActions } from '../actions/CreateNewPostActions';

export function newPostCreatedReducer(state: AppState, action: any): { newPostCreated: boolean } {
  switch (action.type) {
    case CreateNewPostActions.CREATE_POST:
      return { newPostCreated: true };
    case CreateNewPostActions.CONFIRM_CREATE_POST:


    default:
      // return state;
 }
}
