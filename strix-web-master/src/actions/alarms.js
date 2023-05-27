import {
  CREATE_ALARM,
  EDIT_ALARM,
  GET_ALARMS,
  DELETE_ALARM,
} from '../constants';

export const createAlarm = (thingId, object) => ({
  type: CREATE_ALARM,
  thingId,
  object,
});

export const editAlarm = (alarmId, thingId, body) => ({
  type: EDIT_ALARM,
  alarmId,
  thingId,
  body,
});

export const getAlarms = thingId => ({
  type: GET_ALARMS,
  thingId,
});

export const deleteAlarm = (alarmId, thingId) => ({
  type: DELETE_ALARM,
  thingId,
  alarmId,
});
