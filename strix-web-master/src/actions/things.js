import AlarmActions from '../constants/alarmActions';
import {
  UPDATE_THINGS,
  UPDATE_THINGS_SUCCESSFUL,
  UPDATE_THINGS_ERROR,
  EXECUTE_ACTION_CLEAN_ERROR,
  UPDATE_THING_CONFIG,
  GET_SIGNALS,
  GET_CAMERAS,
  DELETE_CAMERA,
  UPDATE_CAMERA,
  HOME_CONTROL_SWITCH,
  EXECUTE_ACTION_SUCCESS,
  EXECUTE_ACTION_ERROR,
  ALARM_EXECUTE_ACTION,
  ALARM_CHECK_RUNNING_ACTION,
  FUEL_CUT_CHECK_RUNNING_ACTION,
  FUEL_CUT_EXECUTE_ACTION,
} from '../constants';

export const updateThings = () => ({
  type: UPDATE_THINGS,
});

export const updateThingsSuccessful = mappedThings => ({
  type: UPDATE_THINGS_SUCCESSFUL,
  mappedThings,
});

export const updateThingsError = error => ({
  type: UPDATE_THINGS_ERROR,
  error,
});

export const removeActionExecutionError = (thingId, category) => ({
  type: EXECUTE_ACTION_CLEAN_ERROR,
  thingId,
  category,
});

export const updateThingsConfiguration = (thingId, body) => ({
  type: UPDATE_THING_CONFIG,
  thingId,
  body,
});

export const getSignals = thingId => ({
  type: GET_SIGNALS,
  thingId,
});

export const getCameras = cameras => ({
  type: GET_CAMERAS,
  cameras,
});

export const deleteCamera = (thingId, cameraId) => ({
  type: DELETE_CAMERA,
  cameraId,
  thingId,
});

export const modifyCamera = (label, cameraId) => ({
  type: UPDATE_CAMERA,
  body: {
    cameraId,
    label,
  },
});

export const homeControlSwitch = (thingId, parentId, value) => ({
  type: HOME_CONTROL_SWITCH,
  thingId,
  parentId,
  value,
});

/*
 * Things actions
 */
export const executeActionSuccess = (category, thingId) => ({
  type: EXECUTE_ACTION_SUCCESS,
  thingId,
  category,
});

export const executeActionError = (category, thingId, error) => ({
  type: EXECUTE_ACTION_ERROR,
  thingId,
  category,
  error,
});

/* Alarms */
export const toggleAlarm = (thingId, isAlarmArmed, body) => ({
  type: ALARM_EXECUTE_ACTION,
  thingId,
  action: isAlarmArmed ? AlarmActions.Disarm : AlarmActions.Arm,
  body,
});

export const alarmCheckRunningAction = thingId => ({
  type: ALARM_CHECK_RUNNING_ACTION,
  thingId,
});

/* Fuel cut */
export const fuelCutCheckRunningAction = thingId => ({
  type: FUEL_CUT_CHECK_RUNNING_ACTION,
  thingId,
});

export const executeFuelCutAction = (thingId, action, code) => ({
  type: FUEL_CUT_EXECUTE_ACTION,
  thingId,
  action,
  body: { code },
});


export default {
  updateThings,
  toggleAlarm,
  getSignals,
  getCameras,
  deleteCamera,
  modifyCamera,
  removeActionExecutionError,
  homeControlSwitch,
  alarmCheckRunningAction,
  fuelCutCheckRunningAction,
  executeFuelCutAction,
};
