/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import preferencesReducer from './preferences';
import {
  GET_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCES_SUCCESS,
  RESET_PREFERENCES,
} from '../constants';

describe('preferences reducer', () => {
  let state;

  beforeEach(() => {
    state = preferencesReducer(undefined, {});
  });


  it('should set preferences', () => {
    const action = {
      type: GET_PREFERENCES_SUCCESS,
      thingId: 'thing_home_id',
      preferences: {
        'com.magenta.events.alarm_set_off': 'push',
        thing_id: 'thing_home_id',
      },
    };
    const newState = preferencesReducer(undefined, action);
    const expectedState = fromJS({
      list: {
        thing_home_id: {
          'com.magenta.events.alarm_set_off': 'push',
          thing_id: 'thing_home_id',
        },
      },
    });
    expect(newState).toEqual(expectedState);
  });

  it('should return same state if thingId is setted', () => {
    const action = {
      type: GET_PREFERENCES_SUCCESS,
      thingId: 'thing_home_id',
      preferences: {
        'com.magenta.events.alarm_set_off': 'push',
        thing_id: 'thing_home_id',
      },
    };

    const actualState = preferencesReducer(state, action);
    const newState = preferencesReducer(actualState, action);

    expect(actualState).toEqual(newState);
  });

  it('should update preferences', () => {
    const actualState = fromJS({
      list: {
        thing_home_id: {
          'com.magenta.events.alarm_set_off': 'push',
          thing_id: 'thing_home_id',
        },
      },
    });
    const action = {
      type: UPDATE_PREFERENCES_SUCCESS,
      thingId: 'thing_home_id',
      values: {
        'com.magenta.events.alarm_set_off': 'alert',
      },
    };
    const newState = preferencesReducer(actualState, action);
    const expectedState = fromJS({
      list: {
        thing_home_id: {
          'com.magenta.events.alarm_set_off': 'alert',
          thing_id: 'thing_home_id',
        },
      },
    });
    expect(newState).toEqual(expectedState);
  });

  it('should reset preferences', () => {
    const action = {
      type: GET_PREFERENCES_SUCCESS,
      thingId: 'thing_home_id',
      preferences: {
        'com.magenta.events.alarm_set_off': 'push',
        thing_id: 'thing_home_id',
      },
    };
    const actualState = preferencesReducer(state, action);
    const resetAction = { type: RESET_PREFERENCES };
    const newState = preferencesReducer(actualState, resetAction);
    const expectedState = fromJS({
      list: {},
    });
    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = preferencesReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
