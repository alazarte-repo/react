import { takeLatest, all, put, call } from 'redux-saga/effects';
import { forgotPassword, userDataService } from '../services';

import {
  CREATE_PASSWORD,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PIN,
  CREATE_PIN_SUCCESS,
  BACKGROUND_LOGIN,
  TOKEN_EXPIRED,
} from '../constants';

export function* createPassword({ password, code, username }) {
  const body = {
    username,
    code,
    password,
  };
  try {
    yield call(forgotPassword.resetPassword, body);
    yield all([
      put({ type: BACKGROUND_LOGIN, username, password }),
      put({ type: CREATE_PASSWORD_SUCCESS }),
    ]);
  } catch (err) {
    yield put({ type: TOKEN_EXPIRED });
  }
}

export function* createPin({ pin }) {
  try {
    const body = [{ action: 'update', path: '/security_pin', value: pin }];
    const pinData = yield call(userDataService.changePin, body);
    yield put({ type: CREATE_PIN_SUCCESS, userData: pinData });
  } catch (err) {
    yield put({ type: TOKEN_EXPIRED });
  }
}

export default function* rootRegistrationSaga() {
  yield all([
    takeLatest(CREATE_PASSWORD, createPassword),
    takeLatest(CREATE_PIN, createPin),
  ]);
}
