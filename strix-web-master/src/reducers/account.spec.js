/* eslint-env jasmine */

import { fromJS } from 'immutable';
import accountReducer from './account';
import {
  ACCOUNT_CREATE,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_VERIFY_USERNAME,
  ACCOUNT_VERIFY_USERNAME_SUCCESS,
  ACCOUNT_VERIFY_USERNAME_ERROR,
  ACCOUNT_CHECK_USERNAME,
  ACCOUNT_CHECK_USERNAME_SUCCESS,
  ACCOUNT_PREVIOUS_STEP,
} from '../constants';


describe('Account reducer', () => {
  let state;

  beforeEach(() => {
    state = accountReducer(undefined, {});
  });

  it('should initialize', () => {
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
      verifyingUsername: false,
      verifyUsernameError: false,
      verifyUsernameErrorMessage: null,
    });

    const newState = accountReducer(undefined, {});

    expect(newState).toEqual(expectedState);
  });

  it('should set creatingAccount to true', () => {
    const action = { type: ACCOUNT_CREATE };
    const newState = accountReducer(state, action);
    const expectedState = fromJS({
      creatingAccount: true,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
      verifyingUsername: false,
      verifyUsernameError: false,
      verifyUsernameErrorMessage: null,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set creatingAccount to true and erase error message', () => {
    const action = { type: ACCOUNT_CREATE };
    const previousState = fromJS({
      creatingAccount: false,
      error: 'An error message',
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: true,
      error: null,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set creatingAccount to false', () => {
    const action = { type: ACCOUNT_CREATE_SUCCESS };
    const previousState = fromJS({
      creatingAccount: true,
      error: null,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      error: null,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set creatingAccount to false and set an error message', () => {
    const action = { type: ACCOUNT_CREATE_ERROR, message: 'An error message' };
    const previousState = fromJS({
      creatingAccount: true,
      error: null,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      error: action.message,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set checking username to true', () => {
    const action = { type: ACCOUNT_CHECK_USERNAME };
    const newState = accountReducer(state, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: true,
      error: null,
      registerAccountStep: 1,
      verifyingUsername: false,
      verifyUsernameError: false,
      verifyUsernameErrorMessage: null,
    });
    expect(newState).toEqual(expectedState);
  });

  it('if username exists, should notify the error', () => {
    const action = { type: ACCOUNT_CHECK_USERNAME_SUCCESS, usernameExists: true };
    const previousState = fromJS({
      creatingAccount: false,
      checkingUsername: true,
      error: null,
      registerAccountStep: 1,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: 'El e-mail ingresado ya se encuentra registrado.',
      registerAccountStep: 1,
    });
    expect(newState).toEqual(expectedState);
  });

  it('if username DOES NOT exists, should go to step 2', () => {
    const action = { type: ACCOUNT_CHECK_USERNAME_SUCCESS, usernameExists: false };
    const previousState = fromJS({
      creatingAccount: false,
      checkingUsername: true,
      error: null,
      registerAccountStep: 1,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 2,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should go to previous step if we are not in step one', () => {
    const action = { type: ACCOUNT_PREVIOUS_STEP };
    const previousState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 2,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should return same step if we were in step one', () => {
    const action = { type: ACCOUNT_PREVIOUS_STEP };
    const previousState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set verifying username to true', () => {
    const action = { type: ACCOUNT_VERIFY_USERNAME };
    const newState = accountReducer(state, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
      verifyingUsername: true,
      verifyUsernameError: false,
      verifyUsernameErrorMessage: null,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set verifying username to false if verify succeed', () => {
    const action = { type: ACCOUNT_VERIFY_USERNAME_SUCCESS };
    const previousState = fromJS({
      creatingAccount: false,
      error: null,
      verifyingUsername: true,
      verifyUsernameError: false,
      verifyUsernameErrorMessage: null,
    });
    const newState = accountReducer(previousState, action);
    const expectedState = fromJS({
      creatingAccount: false,
      error: null,
      verifyingUsername: false,
      verifyUsernameError: false,
      verifyUsernameErrorMessage: null,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set verifyUsernameError to true and set error message in verifyUsernameErrorMessage if verification fails', () => {
    const action = { type: ACCOUNT_VERIFY_USERNAME_ERROR, message: 'An error message' };
    const newState = accountReducer(state, action);
    const expectedState = fromJS({
      creatingAccount: false,
      checkingUsername: false,
      error: null,
      registerAccountStep: 1,
      verifyingUsername: false,
      verifyUsernameError: true,
      verifyUsernameErrorMessage: action.message,
    });
    expect(newState).toEqual(expectedState);
  });


  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = accountReducer(state, action);

    expect(newState).toBe(state);
  });
});
