/* eslint-env jasmine */

import { fromJS } from 'immutable';
import thingsReducer from './things';
import {
  UPDATE_THINGS_SUCCESSFUL,
  // REFRESH_THING_SUCCESS,
  UPDATE_THINGS,
//  ALARM_ARM_AWAY,
//  ALARM_DISARM,
//  ALARM_ARM_AWAY_ERROR,
//  ALARM_ARM_OPEN_ZONES_ERROR,
} from '../constants';

describe('Things reducer', () => {
  it('should set state to loading', () => {
    const action = { type: UPDATE_THINGS };
    const newState = thingsReducer(undefined, action);
    const expectedState = fromJS({ firstLoad: true, isLoading: true, list: [] });
    expect(newState).toEqual(expectedState);
  });

  it('should not set state to loading if there are already things loaded', () => {
    const action = { type: UPDATE_THINGS };
    const actualState = fromJS({ firstLoad: false, isLoading: false, list: [{ id: 1 }] });
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({ firstLoad: false, isLoading: false, list: [{ id: 1 }] });
    expect(newState).toEqual(expectedState);
  });

  it('should update the things list', () => {
    const action = { type: UPDATE_THINGS_SUCCESSFUL, mappedThings: [{ id: 1 }, { id: 2 }] };
    const actualState = fromJS({ firstLoad: true, isLoading: true, list: [] });
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: false,
      isLoading: false,
      list: [{ id: 1 }, { id: 2 }],
    });
    expect(newState).toEqual(expectedState);
  });
  /*
  it('should update given thing', () => {
    const actualState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
      ],
    });
    const action = {
      type: REFRESH_THING_SUCCESS,
      mappedThing: { id: 1, name: 'Thing 1', state: { alarm_armed: true } },
    };
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: true } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
      ],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should update given thing', () => {
    const actualState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
      ],
    });
    const action = {
      type: REFRESH_THING_SUCCESS,
      mappedThing: { id: 1, name: 'Thing 1', state: { alarm_armed: true } },
    };
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: true } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
      ],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set alarm to loading when we dispatch arm away action', () => {
    const actualState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false, loading: false } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3, name: 'Thing 3', state: { alarm_armed: false, loading: false } },
      ],
    });
    const action = {
      type: ALARM_ARM_AWAY,
      thingId: 1,
    };
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false, loading: true } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3, name: 'Thing 3', state: { alarm_armed: false, loading: false } },
      ],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set alarm to loading when we dispatch disarm action', () => {
    const actualState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false, loading: false } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3, name: 'Thing 3', state: { alarm_armed: false, loading: false } },
      ],
    });
    const action = {
      type: ALARM_DISARM,
      thingId: 1,
    };
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false, loading: true } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3, name: 'Thing 3', state: { alarm_armed: false, loading: false } },
      ],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set alarm loading false when we dispatch arm away error', () => {
    const actualState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false, loading: true } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3, name: 'Thing 3', state: { alarm_armed: false, loading: false } },
      ],
    });
    const action = {
      type: ALARM_ARM_AWAY_ERROR,
      thingId: 1,
    };
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      isLoading: false,
      list: [
        { id: 1, name: 'Thing 1', state: { alarm_armed: false, loading: false } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3, name: 'Thing 3', state: { alarm_armed: false, loading: false } },
      ],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set alarm loading false when we dispatch arm away error', () => {
    const zones = ['closed', 'closed', 'closed', 'closed'];
    const actualState = fromJS({
      isLoading: false,
      list: [
        { id: 1,
          name: 'Thing 1',
          state: { alarm_armed: false, loading: true, status: AlarmState.Disarmed, zones }
        },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3,
          name: 'Thing 3',
          state: { alarm_armed: false, loading: false, status: AlarmState.Armed }
        },
      ],
    });
    const action = {
      type: ALARM_ARM_OPEN_ZONES_ERROR,
      thingId: 1,
      zones: ['closed', 'opened', 'closed', 'opened'],
    };
    const newState = thingsReducer(actualState, action);
    const expectedState = fromJS({
      isLoading: false,
      list: [
        { id: 1,
          name: 'Thing 1',
          state: {
            alarm_armed: false,
            loading: true,
            status: AlarmState.ArmOpenZones, zones: action.zones } },
        { id: 2, name: 'Thing 2', state: { speed: 60 } },
        { id: 3,
          name: 'Thing 3',
          state: { alarm_armed: false, loading: false, status: AlarmState.Armed } },
      ],
    });
    expect(newState).toEqual(expectedState);
  });
*/
  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };
    const actualState = fromJS({
      firstLoad: true,
      isLoading: true,
      list: [],
    });

    const newState = thingsReducer(undefined, action);

    expect(newState).toEqual(actualState);
  });
});
