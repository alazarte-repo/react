/* eslint-env jasmine */

import { fromJS } from 'immutable';
import thingsActionsReducer, { actionCategories } from './thingsActions';
import {
  EXECUTE_ACTION_SUCCESS,
  EXECUTE_ACTION_ERROR,
  ALARM_EXECUTE_ACTION,
  ALARM_CHECK_RUNNING_ACTION,
  FUEL_CUT_CHECK_RUNNING_ACTION,
  FUEL_CUT_EXECUTE_ACTION,
  EXECUTE_ACTION_CLEAN_ERROR,
} from '../constants';

const HOME_ID = 'mrn:thing:home:9b7d5d0d-9c1b-4388-9e4d-5a44f5f4a454';
const VEHICLE_ID = 'mrn:thing:vehicle:aa069e1f-c6ec-4b30-bd53-5dde1e549098';

describe('thingsActions reducers', () => {
  let state;

  beforeEach(() => {
    state = thingsActionsReducer(undefined, {});
  });

  it('homeAlarm: should set action to loading when executing an action', () => {
    const action = {
      type: ALARM_EXECUTE_ACTION,
      thingId: HOME_ID,
    };
    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: true,
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const newState = thingsActionsReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('homeAlarm: should set action to loading when checking for runningactions', () => {
    const action = {
      type: ALARM_CHECK_RUNNING_ACTION,
      thingId: HOME_ID,
    };
    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: true,
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const newState = thingsActionsReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('homeAlarm: should unset action loading when action success', () => {
    const action = {
      type: EXECUTE_ACTION_SUCCESS,
      thingId: HOME_ID,
      category: actionCategories.HomeAlarm,
    };
    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: false,
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const newState = thingsActionsReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('homeAlarm: should unset action loading and set error message when action fails', () => {
    const action = {
      type: EXECUTE_ACTION_ERROR,
      thingId: HOME_ID,
      category: actionCategories.HomeAlarm,
      error: 'Test error',
    };
    const previousState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: true,
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: false,
          error: 'Test error',
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const newState = thingsActionsReducer(previousState, action);

    expect(newState).toEqual(expectedState);
  });

  it('homeAlarm: should clear error', () => {
    const action = {
      type: EXECUTE_ACTION_CLEAN_ERROR,
      thingId: HOME_ID,
      category: actionCategories.HomeAlarm,
    };

    const previousState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: false,
          error: 'Test error',
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {
        [HOME_ID]: {
          loading: false,
        },
      },
      [actionCategories.FuelCut]: {},
    });

    const newState = thingsActionsReducer(previousState, action);

    expect(newState).toEqual(expectedState);
  });

  it('fuelCut: should set action to loading when executing an action', () => {
    const action = {
      type: FUEL_CUT_EXECUTE_ACTION,
      thingId: VEHICLE_ID,
    };
    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: true,
        },
      },
    });

    const newState = thingsActionsReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('fuelCut: should set action to loading when checking for runningactions', () => {
    const action = {
      type: FUEL_CUT_CHECK_RUNNING_ACTION,
      thingId: VEHICLE_ID,
    };
    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: true,
        },
      },
    });

    const newState = thingsActionsReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('fuelCut: should unset action to loading when action success', () => {
    const action = {
      type: EXECUTE_ACTION_SUCCESS,
      thingId: VEHICLE_ID,
      category: actionCategories.FuelCut,
    };
    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: false,
        },
      },
    });

    const newState = thingsActionsReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('fuelCut: should unset action loading and set error message when action fails', () => {
    const action = {
      type: EXECUTE_ACTION_ERROR,
      thingId: VEHICLE_ID,
      category: actionCategories.FuelCut,
      error: 'Test error',
    };
    const previousState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: true,
        },
      },
    });

    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: false,
          error: 'Test error',
        },
      },
    });

    const newState = thingsActionsReducer(previousState, action);

    expect(newState).toEqual(expectedState);
  });

  it('fuelCut: should clear error', () => {
    const action = {
      type: EXECUTE_ACTION_CLEAN_ERROR,
      thingId: VEHICLE_ID,
      category: actionCategories.FuelCut,
    };

    const previousState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: false,
          error: 'Test error',
        },
      },
    });

    const expectedState = fromJS({
      [actionCategories.HomeAlarm]: {},
      [actionCategories.FuelCut]: {
        [VEHICLE_ID]: {
          loading: false,
        },
      },
    });

    const newState = thingsActionsReducer(previousState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };
    const actualState = fromJS({
      firstLoad: true,
      isLoading: true,
      list: [],
    });

    const newState = thingsActionsReducer(actualState, action);

    expect(newState).toEqual(actualState);
  });
});
