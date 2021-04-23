import { tassign } from 'tassign';
import { ErrorState } from '../Store';
import { ErrorActions } from '../actions/ErrorActions';
import { ServerError } from 'src/app/entities/ServerError';

export const error: ServerError = {
  message: 'Hello'
};

const INITIAL_STATE: ErrorState = { error };

export function errorReducer(state: ErrorState = INITIAL_STATE, action: any): ErrorState {
  switch (action.type) {
    case ErrorActions.ADD_ERROR:
      return { error: action.payload };
    default:
      return state;
  }
}
