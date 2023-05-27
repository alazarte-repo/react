import { fromJS } from 'immutable';
import {
  CREATE_PASSWORD_SUCCESS,
  CREATE_PIN_SUCCESS,
  TOKEN_EXPIRED,
} from '../constants';

const initialState = fromJS({
  registrationStep: 'createPassword',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOKEN_EXPIRED:
      return state.set('registrationStep', 'tokenExpired');
    case CREATE_PASSWORD_SUCCESS:
      return state.set('registrationStep', 'createPin');
    case CREATE_PIN_SUCCESS:
      return state.set('registrationStep', 'registrationSuccess');
    default:
      return state;
  }
}
