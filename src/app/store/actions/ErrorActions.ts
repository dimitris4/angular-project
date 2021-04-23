import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { ServerError } from '../../entities/ServerError';

@Injectable({ providedIn: 'root'})
export class ErrorActions {

  constructor(private ngRedux: NgRedux<AppState>) {}

  static ADD_ERROR = 'ADD_ERROR';

  addError(error: ServerError): void {
    this.ngRedux.dispatch({
      type: ErrorActions.ADD_ERROR,
      payload: error
    });
  }
}
