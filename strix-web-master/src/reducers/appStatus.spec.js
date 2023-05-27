/* eslint-env jasmine */

import { fromJS } from 'immutable';
import appStatusReducer from './appStatus';
import {
  APP_IS_OFFLINE,
  APP_IS_ONLINE,
} from '../constants';

describe('appStatus reducer', () => {
  let state;

  beforeEach(() => {
    state = appStatusReducer(undefined, {});
  });

  it('should initialize', () => {
    const expectedState = fromJS({
      offline: false,
    });

    const newState = appStatusReducer(undefined, {});

    expect(newState).toEqual(expectedState);
  });

  it('should set app state to offline', () => {
    const action = { type: APP_IS_OFFLINE };
    const actualState = fromJS({
      offline: false,
    });
    const expectedState = fromJS({
      offline: true,
    });

    const newState = appStatusReducer(actualState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set app state to online', () => {
    const action = { type: APP_IS_ONLINE };
    const actualState = fromJS({
      offline: true,
    });
    const expectedState = fromJS({
      offline: false,
    });

    const newState = appStatusReducer(actualState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = appStatusReducer(state, action);

    expect(newState).toBe(state);
  });
});
