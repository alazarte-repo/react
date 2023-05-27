/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import forgotPasswordReducer from './forgotPassword';
import {
  FORGOT_PASSWORD_REQUEST_CODE,
  FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL,
  FORGOT_PASSWORD_RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL,
  FORGOT_PASSWORD_REQUEST_CODE_ERROR,
} from '../constants';

describe('forgotPassword reducer', () => {
  let state;

  beforeEach(() => {
    state = forgotPasswordReducer(undefined, {});
  });


  it('should initialize', () => {
    const expectedState = fromJS({
      username: '',
      forgotPassEmailStatus: '',
      forgotPassStep: '',
    });

    const newState = forgotPasswordReducer(undefined, {});

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should setup username', () => {
    const USERNAME = 'test';
    const action = { type: FORGOT_PASSWORD_REQUEST_CODE, username: USERNAME };

    const newState = forgotPasswordReducer(state, action);

    expect(newState.get('username')).toEqual(USERNAME);
  });

  it('should set passwordChanged step', () => {
    const STEP = 'passwordChanged';
    const action = { type: FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL };

    const newState = forgotPasswordReducer(state, action);

    expect(newState.get('forgotPassStep')).toEqual(STEP);
  });

  it('should set error step', () => {
    const STEP = 'error';
    const action = { type: FORGOT_PASSWORD_RESET_PASSWORD_ERROR };

    const newState = forgotPasswordReducer(state, action);

    expect(newState.get('forgotPassStep')).toEqual(STEP);
  });

  it('should set success status', () => {
    const STATUS = 'forgotPassEmailSuccess';
    const action = { type: FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL };

    const newState = forgotPasswordReducer(state, action);

    expect(newState.get('forgotPassEmailStatus')).toEqual(STATUS);
  });

  it('should set error status', () => {
    const STATUS = 'forgotPassEmailError';
    const action = { type: FORGOT_PASSWORD_REQUEST_CODE_ERROR };

    const newState = forgotPasswordReducer(state, action);

    expect(newState.get('forgotPassEmailStatus')).toEqual(STATUS);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = forgotPasswordReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
