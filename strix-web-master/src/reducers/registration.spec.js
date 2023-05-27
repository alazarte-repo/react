/* eslint-env jasmine */

import { fromJS } from 'immutable';
import { CREATE_PASSWORD_SUCCESS, CREATE_PIN_SUCCESS, TOKEN_EXPIRED } from '../constants';
import registrationReducer from './registration';

describe('Registration reducer', () => {
  let state;

  beforeEach(() => {
    state = registrationReducer(undefined, {});
  });

  it('should set token expired step', () => {
    const actionExpiredToken = { type: TOKEN_EXPIRED };
    const stateExpiredToken = registrationReducer(state, actionExpiredToken);
    const firstState = fromJS({ registrationStep: 'tokenExpired' });
    expect(stateExpiredToken).toEqual(firstState);
  });

  it('should set create pin step', () => {
    const actionCreatePass = { type: CREATE_PASSWORD_SUCCESS };
    const stateCreatePass = registrationReducer(state, actionCreatePass);
    const secondState = fromJS({ registrationStep: 'createPin' });
    expect(stateCreatePass).toEqual(secondState);
  });

  it('should set registration success step', () => {
    const actionCreatePin = { type: CREATE_PIN_SUCCESS };
    const stateRegistrationSuccess = registrationReducer(state, actionCreatePin);
    const expectedState = fromJS({ registrationStep: 'registrationSuccess' });
    expect(stateRegistrationSuccess, expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = registrationReducer(state, action);

    expect(newState).toEqual(state);
  });
});
