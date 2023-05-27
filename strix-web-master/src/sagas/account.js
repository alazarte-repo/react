import { put, all, takeLatest, call, take, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import accountService from '../services/account';
import serializeToken from '../serializers/account';
import { notifyError } from '../actions/actionStatus';
import {
  ACCOUNT_CREATE,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATE_ERROR,
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_CLEAR_ERROR,
  ACCOUNT_CHECK_USERNAME,
  ACCOUNT_CHECK_USERNAME_SUCCESS,
  ACCOUNT_VERIFY_USERNAME,
  ACCOUNT_VERIFY_USERNAME_SUCCESS,
  ACCOUNT_VERIFY_USERNAME_ERROR,
} from '../constants';

export function* accountCreate({ accountInformation }) {
  try {
    const token = yield call(accountService.getRegisterToken, accountInformation);
    yield call(accountService.create, accountInformation, serializeToken(token));
    yield put({
      type: ACCOUNT_CREATE_SUCCESS,
      username: accountInformation.user.username,
      password: accountInformation.user.password,
    });
  } catch (error) {
    if (error.response != null && error.response.status === 400) {
      if (error.response.data.code === 'wamp.error.invalid_argument') {
        yield put({
          type: ACCOUNT_CREATE_ERROR,
          message: error.response.data.message,
        });
        return;
      }
    }
    yield put({
      type: ACCOUNT_CREATE_ERROR,
      message: 'Se ha producido un error al crear la cuenta. Por favor intente de nuevo más tarde.',
    });
  }
}

export function* accountLogin({ username, password }) {
  yield put({
    type: LOGIN_REQUEST,
    data: { username, password },
  });

  if (yield take(LOGIN_REQUEST_ERROR)) {
    yield put({ type: LOGIN_CLEAR_ERROR });
    yield put({
      type: LOGIN_REQUEST_ERROR,
      error: 'Se ha producido un error al querer ingresar a la cuenta. Por favor intente de nuevo más tarde.',
    });
    yield put(push('/login'));
  }
}

export function* checkUsername({ username }) {
  try {
    const token = yield call(accountService.getRegisterToken);
    const userExists = yield call(accountService.checkUsername, username, serializeToken(token));
    if (userExists == null) {
      yield put(notifyError('Ha ocurrido un error verificando el usuario, por favor intente denuevo en unos minutos'));
    } else {
      yield put({ type: ACCOUNT_CHECK_USERNAME_SUCCESS, usernameExists: userExists });
    }
  } catch (error) {
    yield put(notifyError('Ha ocurrido un error verificando el usuario, por favor intente denuevo en unos minutos'));
  }
}

export function* verifyUsername({ username, code }) {
  try {
    const token = yield call(accountService.getRegisterToken);
    yield call(accountService.verifyAccount, username, code, serializeToken(token));
    yield put({ type: ACCOUNT_VERIFY_USERNAME_SUCCESS });
    yield delay(10000);
    yield put(push('/login'));
  } catch (error) {
    if (error.response != null &&
      error.response.data != null &&
      error.response.data.description != null) {
      yield put({
        type: ACCOUNT_VERIFY_USERNAME_ERROR,
        message: error.response.data.description,
      });
    } else {
      yield put({ type: ACCOUNT_VERIFY_USERNAME_ERROR, message: null });
    }
  }
}

export default function* rootAccountSaga() {
  yield all([
    takeLatest(ACCOUNT_CREATE_SUCCESS, accountLogin),
    takeLatest(ACCOUNT_CREATE, accountCreate),
    takeLatest(ACCOUNT_CHECK_USERNAME, checkUsername),
    takeLatest(ACCOUNT_VERIFY_USERNAME, verifyUsername),
  ]);
}
