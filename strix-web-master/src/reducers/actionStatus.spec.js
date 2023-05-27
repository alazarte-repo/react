/* eslint-env jasmine */
import { fromJS, is } from 'immutable';
import actionStatusReducer from './actionStatus';
import {
  ERROR,
  SUCCESS,
  RESET_ACTION_STATUS,
} from '../constants';

describe('ActionStatus reducer', () => {
  let state;

  beforeEach(() => {
    state = actionStatusReducer(undefined, {});
  });


  it('should initialize', () => {
    const newState = actionStatusReducer(undefined, {});
    const expectedState = fromJS({
      error: {
        status: false,
        message: '',
      },
      success: {
        status: false,
        message: '',
      },
    });
    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should setup an error message', () => {
    const MESSAGE = 'Testing Error';
    const action = {
      type: ERROR,
      state: {
        status: true,
        message: MESSAGE,
      },
    };

    const newState = actionStatusReducer(state, action);

    const errorState = newState.get('error');
    const successState = newState.get('success');
    expect(is(errorState, fromJS({
      status: true,
      message: MESSAGE,
    }))).toEqual(true);
    expect(is(successState, state.get('success')));
  });

  it('should setup a success message', () => {
    const MESSAGE = 'Testing Success';
    const action = {
      type: SUCCESS,
      state: {
        status: true,
        message: MESSAGE,
      },
    };

    const newState = actionStatusReducer(state, action);

    const errorState = newState.get('error');
    const successState = newState.get('success');
    expect(is(errorState, state.get('error')));
    expect(is(successState, fromJS({
      status: true,
      message: MESSAGE,
    }))).toEqual(true);
  });

  it('should reset action status', () => {
    const initialState = {
      error: {
        status: false,
        message: '',
      },
      success: {
        status: false,
        message: '',
      },
    };
    const action = { type: RESET_ACTION_STATUS };

    const newState = actionStatusReducer(state, action);

    const expectedState = fromJS(initialState);
    expect(is(newState, expectedState)).toEqual(true);
  });
});
