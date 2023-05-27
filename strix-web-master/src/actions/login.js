import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_CLEAR_ERROR,
  LOGIN_SUCCESSFUL,
} from '../constants';

export const changeForm = newFormState => ({
  type: CHANGE_FORM, newFormState,
});

export const setAuthState = newAuthState => ({
  type: SET_AUTH,
  newAuthState,
});

export const sendingRequest = sending => ({
  type: SENDING_REQUEST,
  sending,
});

export const loginRequest = (username, password) => ({
  type: LOGIN_REQUEST,
  data: { username, password },
});

export const loginRequestError = error => ({
  type: LOGIN_REQUEST_ERROR,
  error,
});

export const loginSuccessful = () => ({
  type: LOGIN_SUCCESSFUL,
});

export const loginClearError = () => ({
  type: LOGIN_CLEAR_ERROR,
});

