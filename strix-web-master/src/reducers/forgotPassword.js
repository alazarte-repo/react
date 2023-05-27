import { Map } from 'immutable';
import {
  FORGOT_PASSWORD_REQUEST_CODE,
  FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL,
  FORGOT_PASSWORD_RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL,
  FORGOT_PASSWORD_REQUEST_CODE_ERROR,
} from '../constants';

const initialState = new Map({
  username: '',
  forgotPassEmailStatus: '',
  forgotPassStep: '',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST_CODE:
      return state.set('username', action.username);
    case FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL:
      return state.set('forgotPassStep', 'passwordChanged');
    case FORGOT_PASSWORD_RESET_PASSWORD_ERROR:
      return state.set('forgotPassStep', 'error');
    case FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL:
      return state.set('forgotPassEmailStatus', 'forgotPassEmailSuccess');
    case FORGOT_PASSWORD_REQUEST_CODE_ERROR:
      return state.set('forgotPassEmailStatus', 'forgotPassEmailError');
    default:
      return state;
  }
}
