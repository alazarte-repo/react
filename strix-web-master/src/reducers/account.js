import { fromJS } from 'immutable';
import {
  ACCOUNT_CREATE,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CHECK_USERNAME,
  ACCOUNT_CHECK_USERNAME_SUCCESS,
  ACCOUNT_PREVIOUS_STEP,
  ACCOUNT_VERIFY_USERNAME,
  ACCOUNT_VERIFY_USERNAME_SUCCESS,
  ACCOUNT_VERIFY_USERNAME_ERROR,
} from '../constants';

const initialState = fromJS({
  creatingAccount: false,
  checkingUsername: false,
  error: null,
  registerAccountStep: 1,
  verifyingUsername: false,
  verifyUsernameError: false,
  verifyUsernameErrorMessage: null,
});

function usernameExists(state, exists) {
  const newState = state.set('checkingUsername', false);
  return exists
    ? newState.set('error', 'El e-mail ingresado ya se encuentra registrado.')
    : newState.set('error', null)
      .set('registerAccountStep', 2);
}

function previousStep(state) {
  const step = state.get('registerAccountStep');
  return step > 1
    ? state.set('registerAccountStep', step - 1)
    : state;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_CREATE:
      return state.set('creatingAccount', true)
        .set('error', null);
    case ACCOUNT_CREATE_SUCCESS:
      return state.set('creatingAccount', false);
    case ACCOUNT_CREATE_ERROR:
      return state.set('creatingAccount', false)
        .set('error', action.message);
    case ACCOUNT_CHECK_USERNAME:
      return state.set('checkingUsername', true);
    case ACCOUNT_CHECK_USERNAME_SUCCESS:
      return usernameExists(state, action.usernameExists);
    case ACCOUNT_PREVIOUS_STEP:
      return previousStep(state);
    case ACCOUNT_VERIFY_USERNAME:
      return state.set('verifyingUsername', true);
    case ACCOUNT_VERIFY_USERNAME_ERROR:
      return state.set('verifyingUsername', false)
        .set('verifyUsernameError', true)
        .set('verifyUsernameErrorMessage', action.message);
    case ACCOUNT_VERIFY_USERNAME_SUCCESS:
      return state.set('verifyingUsername', false);
    default:
      return state;
  }
}
