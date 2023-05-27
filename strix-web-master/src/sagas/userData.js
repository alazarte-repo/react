import { put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { userDataService, accountService } from '../services';
import { handleHttpErrors } from './handleErrors';
import serializeUser from '../serializers/user';
import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESSFUL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PIN,
  CHANGE_PIN_SUCCESS,
  SUCCESS,
} from '../constants';

// Workaround thar allows us tests this module
// with es6 import it throws an exception, webpack bug
const history = require('../store');

export function* getUserData() {
  const userData = yield call(userDataService.get);
  const accountData = yield call(accountService.get, userData.account_id);
  const accType = yield call(userDataService.accType);
  yield put({
    type: GET_USER_DATA_SUCCESSFUL,
    userData: serializeUser(userData, accountData, accType),
  });
}

export function* changePassword({ body }) {
  yield call(userDataService.changePassword, body);
  yield put({ type: CHANGE_PASSWORD_SUCCESS });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Tu contraseña ha sido cambiada con exito',
    },
  });
  yield call(history.history.goBack);
}

export function* changePin({ pin }) {
  const body = [{ action: 'update', path: '/security_pin', value: pin }];
  const pinData = yield call(userDataService.changePin, body);
  yield put({ type: CHANGE_PIN_SUCCESS, userData: pinData });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Tu PIN ha sido cambiado con exito',
    },
  });
  yield call(history.history.goBack);
}

export default function* rootUserDataSaga() {
  yield all([
    takeEvery(GET_USER_DATA, handleHttpErrors(getUserData, 'Ha ocurrido un error al obtener información de la cuenta')),
    takeEvery(CHANGE_PIN, handleHttpErrors(changePin, 'Ha ocurrido un error al cambiar tu PIN')),
    takeLatest(CHANGE_PASSWORD, handleHttpErrors(changePassword, 'Ha ocurrido un error al cambiar tu contraseña')),
  ]);
}
