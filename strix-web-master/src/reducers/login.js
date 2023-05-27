import { fromJS } from 'immutable';
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

const initialState = fromJS({
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

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return state.set('formState', fromJS(action.newFormState));
    case SET_AUTH:
      return state.set('loggedIn', action.newAuthState);
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case LOGIN_REQUEST_ERROR:
      return state.set('error', action.error);
    case LOGIN_CLEAR_ERROR:
      return state.delete('error');
    case LOGIN_SUCCESSFUL:
      return state
        .update('formState', formState => formState.set('username', '').set('password', ''))
        .set('device', action.devicePayload)
        .set('loggedIn', true);
    case REFRESH_TOKEN_REQUEST:
      return state.set('isRefreshing', true);
    case REFRESH_SUCCESS:
    case REFRESH_TOKEN_ERROR:
      return state.set('isRefreshing', false);
    case LOGOUT_SUCCESSFUL:
      return state.set('loggedIn', false);
    default:
      return state;
  }
}
