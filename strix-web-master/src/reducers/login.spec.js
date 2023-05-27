/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import loginReducer from './login';
import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_CLEAR_ERROR,
  LOGIN_SUCCESSFUL,
  LOGOUT_SUCCESSFUL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_TOKEN_ERROR,
} from '../constants';


describe('login reducer', () => {
  let state;

  beforeEach(() => {
    state = loginReducer(undefined, {});
  });


  it('should update form', () => {
    const action = { type: CHANGE_FORM, newFormState: '1' };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: '1',
      device: {},
      error: '',
      currentlySending: false,
      loggedIn: false,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should update login state', () => {
    const action = { type: SET_AUTH, newAuthState: true };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: '',
      currentlySending: false,
      loggedIn: true,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should take sending state', () => {
    const action = { type: SENDING_REQUEST, sending: true };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: '',
      currentlySending: true,
      loggedIn: false,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should take login error', () => {
    const action = { type: LOGIN_REQUEST_ERROR, error: 'error' };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: 'error',
      currentlySending: false,
      loggedIn: false,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });
  it('should delete login error', () => {
    const action = { type: LOGIN_CLEAR_ERROR, error: 'error' };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      isRefreshing: false,
      currentlySending: false,
      loggedIn: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should login app', () => {
    const action = { type: LOGIN_SUCCESSFUL };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: undefined,
      error: '',
      currentlySending: false,
      loggedIn: true,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should logout app', () => {
    const action = { type: LOGOUT_SUCCESSFUL };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: '',
      currentlySending: false,
      loggedIn: false,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should return if token is refreshing', () => {
    const action = { type: REFRESH_TOKEN_REQUEST };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: '',
      currentlySending: false,
      loggedIn: false,
      isRefreshing: true,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should return if token was refreshed successfully', () => {
    const action = { type: REFRESH_SUCCESS };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: '',
      currentlySending: false,
      loggedIn: false,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should return if token was refreshed unsuccessfully', () => {
    const action = { type: REFRESH_TOKEN_ERROR };
    const newState = loginReducer(undefined, action);
    const expectedState = fromJS({
      formState: {
        username: '',
        password: '',
      },
      device: {},
      error: '',
      currentlySending: false,
      loggedIn: false,
      isRefreshing: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = loginReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
