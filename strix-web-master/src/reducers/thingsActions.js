import { fromJS } from 'immutable';
import {
  EXECUTE_ACTION_SUCCESS,
  EXECUTE_ACTION_ERROR,
  ALARM_EXECUTE_ACTION,
  ALARM_CHECK_RUNNING_ACTION,
  FUEL_CUT_CHECK_RUNNING_ACTION,
  FUEL_CUT_EXECUTE_ACTION,
  EXECUTE_ACTION_CLEAN_ERROR,
} from '../constants';

export const actionCategories = Object.freeze({
  HomeAlarm: 'homeAlarm',
  FuelCut: 'fuelCut',
});

/**
 * keys: Action categories - Group actions that belongs to the same action set
 * i.e: fuel_cut_off / fuel_restore
 *
 * value: Object containing
 *  - key: loading
 *  - value: true | false
 *  - if true, the action is in 'running' state
 *
 *  - key: error
 *  - value: string
 *  - if null there was no error, otherwise an string describing the error
 */
const initialState = fromJS({
  [actionCategories.HomeAlarm]: {},
  [actionCategories.FuelCut]: {},
});


function setAlarmExecutionLoading(state, action, actionCategory, isLoading) {
  const currentThingState = state.getIn([actionCategory, action.thingId]);
  const newThingState = currentThingState != null
    ? currentThingState.set('loading', isLoading)
    : fromJS({ loading: isLoading });
  return state.setIn([actionCategory, action.thingId], newThingState);
}

function handleError(state, action) {
  let newState = setAlarmExecutionLoading(state, action, action.category, false);
  newState = newState.setIn([action.category, action.thingId, 'error'], action.error);
  return newState;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ALARM_EXECUTE_ACTION:
    case ALARM_CHECK_RUNNING_ACTION:
      return setAlarmExecutionLoading(state, action, actionCategories.HomeAlarm, true);
    case FUEL_CUT_CHECK_RUNNING_ACTION:
    case FUEL_CUT_EXECUTE_ACTION:
      return setAlarmExecutionLoading(state, action, actionCategories.FuelCut, true);
    case EXECUTE_ACTION_SUCCESS:
      return setAlarmExecutionLoading(state, action, action.category, false);
    case EXECUTE_ACTION_ERROR:
      return handleError(state, action);
    case EXECUTE_ACTION_CLEAN_ERROR:
      return state.deleteIn([action.category, action.thingId, 'error']);
    default:
      return state;
  }
}

export default reducer;
