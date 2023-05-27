import { all, put, takeEvery, call, select, take, delay } from 'redux-saga/effects';
import { thingsService, remindersService } from '../services';
import { getHistoryPage } from '../selectors/Things.selector';
import { handleHttpErrors } from './handleErrors';
import {
  serializeReminder,
  setRemindersTypes,
  serializeReminderHistoryItem,
} from '../serializers/reminders';
import {
  MARK_SERVICE_DONE,
  GET_REMINDERS,
  GET_REMINDERS_SUCCESSFUL,
  ADD_REMINDERS,
  ADD_REMINDERS_SUCCESSFUL,
  CHANGE_REMINDER_CONFIG,
  MARK_SERVICE_DONE_SUCCESS,
  DELETE_REMINDER,
  DELETE_REMINDER_SUCCESS,
  REMINDERS_LOADING,
  REMINDERS_LOADING_ERROR,
  REMINDERS_GET_HISTORY_ITEMS,
  REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
  SUCCESS,
} from '../constants';

const HISTORY_PAGE_SIZE = 10;

export function* getReminders({ thingId }) {
  try {
    yield put({ type: REMINDERS_LOADING });

    // Reminders Types
    const reminderTypesData = yield call(remindersService.getTypes);
    setRemindersTypes(reminderTypesData);

    // Reminders
    let remindersData = yield call(thingsService.getReminders, thingId);
    remindersData = remindersData.map(serializeReminder);

    // Reminders history
    yield put({ type: REMINDERS_GET_HISTORY_ITEMS, thingId });
    yield take(REMINDERS_GET_HISTORY_ITEMS_SUCCESS);

    yield put({
      type: GET_REMINDERS_SUCCESSFUL,
      remindersData,
      reminderTypesData,
    });
  } catch (error) {
    yield put({ type: REMINDERS_LOADING_ERROR });
    throw error;
  }
}

export function* changeReminderConfig({ thingId, reminderId, configurations }) {
  const body = configurations.map((config) => {
    if (config.type === 'active') return ({ action: 'update', path: `/${config.type}`, value: config.value });
    return ({ action: 'update', path: `${config.type}`, value: config.value });
  });
  yield call(remindersService.updateReminder, thingId, reminderId, body);
  // Backend needs time to update indexes, if we get reminders too soon we do not see the changes
  yield delay(1000);
  yield put({ type: GET_REMINDERS, thingId });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha cambiado con exito tu la configuracion de tu recordatorio',
    },
  });
}

export function* addReminders({ thingId, reminderTypes }) {
  let remindersCreated = yield all(reminderTypes.map(t => (
    call(remindersService.add, thingId, { reminder_type_id: t })
  )));
  remindersCreated = remindersCreated.map(serializeReminder);

  yield put({ type: ADD_REMINDERS_SUCCESSFUL, remindersCreated });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha agregado con exito tu recordatorio',
    },
  });
}

export function* reminderDone({ thingId, reminders, doneAt }) {
  const body = {
    mileage: doneAt.mileage ? Number(doneAt.mileage) : 0,
    date: doneAt.date,
    notes: '',
  };

  const servicesDone = yield all(reminders.map(reminder => (
    call(remindersService.register, thingId, reminder, body)
  )));

  yield delay(1000);

  const getHistoryParameters = {
    _sort: 'created_timestamp+desc',
    _limit: HISTORY_PAGE_SIZE,
    _page: 1,
  };
  let historyItems = yield call(remindersService.getHistory, thingId, getHistoryParameters);
  historyItems = historyItems.map(serializeReminderHistoryItem);

  yield put({ type: GET_REMINDERS, thingId });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha marcado como hecho tus recordatorios',
    },
  });
  yield put({
    type: MARK_SERVICE_DONE_SUCCESS,
    servicesDone: servicesDone.map(x => x.id),
    historyItems,
  });
}

export function* deleteReminder({ thingId, reminderId }) {
  yield call(remindersService.delete, thingId, reminderId);
  yield put({ type: DELETE_REMINDER_SUCCESS, reminderId });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'El recordatorio se ha borrado con exito',
    },
  });
}

export function* getHistoryItems({ thingId }) {
  const page = yield select(getHistoryPage);
  const getHistoryParameters = {
    _sort: 'created_timestamp+desc',
    _limit: HISTORY_PAGE_SIZE,
    _page: page,
  };

  let historyItems = yield call(remindersService.getHistory, thingId, getHistoryParameters);
  historyItems = historyItems.map(serializeReminderHistoryItem);

  yield put({
    type: REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
    historyItems,
    pageSize: HISTORY_PAGE_SIZE,
  });
}

export default function* rootRemindersSaga() {
  yield all([
    takeEvery(DELETE_REMINDER, handleHttpErrors(deleteReminder, 'Ha ocurrido un error al eliminar el recordatorio')),
    takeEvery(GET_REMINDERS, handleHttpErrors(getReminders, 'Ha ocurrido un error al agregar los recordatorios')),
    takeEvery(CHANGE_REMINDER_CONFIG, handleHttpErrors(changeReminderConfig, 'Ha ocurrido un error al cambiar la configuracion de tu recordatorio')),
    takeEvery(ADD_REMINDERS, handleHttpErrors(addReminders, 'Ha ocurrido un error al agregar tu recordatorio')),
    takeEvery(MARK_SERVICE_DONE, handleHttpErrors(reminderDone, 'Ha ocurrido un error al marcar tus recordatorios como hechos')),
    takeEvery(REMINDERS_GET_HISTORY_ITEMS, handleHttpErrors(getHistoryItems, 'Ha ocurrido un error al cargar el historial')),
  ]);
}
