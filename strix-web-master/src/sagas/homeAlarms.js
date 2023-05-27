import { takeEvery, takeLatest, all, call, put } from 'redux-saga/effects';
import { handleHttpErrors } from './handleErrors';
import {
  CREATE_ALARM,
  CREATE_ALARM_SUCCESS,
  SUCCESS,
  GET_ALARMS,
  GET_ALARMS_SUCCESS,
  DELETE_ALARM_SUCCESS,
  DELETE_ALARM,
  EDIT_ALARM,
  EDIT_ALARM_SUCCESS,
} from '../constants';
import taskService from '../services/tasks';
import alarmUtils from '../utils/alarmUtils';

const updateAlarmTime = (alarm) => {
  const { hour, minutes, dow } = alarm.cron;
  const timeLocal = alarmUtils.timeUtcToLocal(minutes, hour, dow);

  const cron = { ...alarm.cron,
    hour: timeLocal.hours,
    minutes: timeLocal.minutes,
    dow: timeLocal.days };
  return { ...alarm, cron };
};

export function* getAlarms({ thingId }) {
  const requestPayload = yield call(taskService.get, thingId);
  const transformedPayload = requestPayload.map(item => updateAlarmTime(item));
  yield put({ type: GET_ALARMS_SUCCESS, list: transformedPayload });
}

export function* createAlarm(action) {
  const { timeForm } = action.object;
  const timeUtc = alarmUtils.timeToUtc(timeForm, action.object.repeatDays);
  const body = {
    action: action.object.actionAlarm,
    cron: {
      minutes: timeUtc.minutes,
      hour: timeUtc.hours,
      day: '*',
      month: '*',
      dow: timeUtc.repeatDays,
    },
    retries: 3,
    properties: {
      code: action.object.code,
      zones: [],
    },
  };
  const requestPayload = yield call(taskService.create, body, action.thingId);
  const alarm = updateAlarmTime(requestPayload);

  yield put({ type: CREATE_ALARM_SUCCESS, alarm });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha creado con exito tu nueva alarma',
    },
  });
}

export function* deleteAlarm(action) {
  yield call(taskService.delete, action.thingId, action.alarmId);
  yield put({ type: DELETE_ALARM_SUCCESS, id: action.alarmId });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha eliminado con exito tu alarma',
    },
  });
}

export function* editAlarm(action) {
  const { timeForm, repeatDays, code, actionAlarm, oldTimeForm } = action.body;
  const request = [];

  if (timeForm) {
    const timeUtc = alarmUtils.timeToUtc(timeForm, []);

    request.push({
      action: 'update',
      path: '/cron/hour',
      value: timeUtc.hours,
    },
    {
      action: 'update',
      path: '/cron/minutes',
      value: timeUtc.minutes,
    });
  }
  if (code.length) {
    request.push({
      action: 'update',
      path: '/properties/code',
      value: code,
    });
  }
  if (repeatDays.length) {
    const otherForm = timeForm || oldTimeForm;
    const timeUtc = alarmUtils.timeToUtc(otherForm, repeatDays);
    request.push({
      action: 'update',
      path: '/cron/dow',
      value: timeUtc.repeatDays,
    });
  }
  if (actionAlarm != null) {
    request.push({
      action: 'update',
      path: '/action',
      value: actionAlarm,
    });
  }

  const responsePayload = yield call(
    taskService.edit,
    request,
    action.thingId,
    action.alarmId,
  );
  const alarm = updateAlarmTime(responsePayload);
  yield put({ type: EDIT_ALARM_SUCCESS, alarm });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha editado con exito tu alarma',
    },
  });
}

export default function* rootHomeAlarmSaga() {
  yield all([
    takeEvery(CREATE_ALARM, handleHttpErrors(createAlarm, 'Ha ocurrido un error al crear tu alarma')),
    takeEvery(GET_ALARMS, handleHttpErrors(getAlarms, 'Ha ocurrido un error al obtener tus alarmas')),
    takeLatest(DELETE_ALARM, handleHttpErrors(deleteAlarm, 'Ha ocurrido un error al eliminar tu alarma')),
    takeLatest(EDIT_ALARM, handleHttpErrors(editAlarm, 'Hubo un error al editar tu alarma')),
  ]);
}

