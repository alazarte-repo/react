import { put, all, call, takeEvery } from 'redux-saga/effects';
import { forgotPassword } from '../services';

import {
  FORGOT_PASSWORD_REQUEST_CODE,
  FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL,
  FORGOT_PASSWORD_REQUEST_CODE_ERROR,
  FORGOT_PASSWORD_RESET_PASSWORD,
  FORGOT_PASSWORD_RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL,
} from '../constants';


export function* requestResetPassword({ username }) {
  try {
    const body = {
      username,
    };
    yield call(forgotPassword.requestChangePasswordCode, body);
    yield put({ type: FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL });
  } catch (err) {
    yield put({ type: FORGOT_PASSWORD_REQUEST_CODE_ERROR, error: 'User not found' });
  }
}

export function* resetPassword({ username, password, code }) {
  try {
    const body = {
      username,
      code,
      password,
    };
    yield call(forgotPassword.resetPassword, body);
    yield put({ type: FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL });
  } catch (err) {
    yield put({ type: FORGOT_PASSWORD_RESET_PASSWORD_ERROR, err });
  }
}

export default function* rootForgotPasswordSaga() {
  yield all([
    takeEvery(FORGOT_PASSWORD_REQUEST_CODE, requestResetPassword),
    takeEvery(FORGOT_PASSWORD_RESET_PASSWORD, resetPassword),
  ]);
}
