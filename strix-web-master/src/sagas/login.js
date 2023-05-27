import { put, all, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import querystring from 'querystring';
import { loginUtils, deviceUtils } from 'utils';
import { loginService, devices } from '../services';
import {
  DEVICE_IDENTIFIER,
  DEVICE_TOKEN,
} from '../constants/localStorageKeys';

import {
  LOGIN_REQUEST,
  LOGIN_CLEAR_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESSFUL,
  LOGIN_REQUEST_ERROR,
  LOGIN_SUCCESSFUL,
  BACKGROUND_LOGIN,
  BACKGROUND_LOGIN_SUCCESS,
} from '../constants';

const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error. Intente de nuevo en unos minutos.';

export function* updateDeviceToken() {
  try {
    const vendorId = localStorage.getItem(DEVICE_IDENTIFIER);
    const device = yield call(devices.get, { identifier: vendorId });

    // TODO: This if is a workaround for
    // https://app.craft.io/product/2305843009784619471/items/cards/MAG-1510
    // When two or more different users can register the same device, this
    // must be removed
    if (device.length === 0) {
      yield put({ type: LOGIN_REQUEST_ERROR, error: DEFAULT_ERROR_MESSAGE });
      localStorage.clear();
      window.location.reload();
      return;
    }
    const deviceToken = localStorage.getItem(DEVICE_TOKEN);
    yield call(devices.updateToken, device[0].id, deviceToken);
    yield put(push('/dashboard'));
  } catch (error) {
    yield put({ type: LOGIN_REQUEST_ERROR, error: 'Ocurrió un error. Intente de nuevo en unos minutos.' });
  }
}

export function* loginFlow(action) {
  yield put({ type: LOGIN_CLEAR_ERROR });

  const { username, password } = action.data;
  try {
    const body = querystring.stringify({
      password,
      username,
      client_device_id: deviceUtils.identifier,
      grant_type: 'password',
    });
    const userPayload = yield call(loginService.login, body);
    yield call(loginUtils.setLocalStorage, userPayload);
    const devicePayload = yield call(devices.post, deviceUtils);
    yield call(loginUtils.setDeviceID, devicePayload.id);
    yield put(push('/dashboard'));
    yield put({ type: LOGIN_SUCCESSFUL, devicePayload });
  } catch (error) {
    if (error.request != null && error.request.status === 400) {
      const url = error.request.responseURL.split('/');
      const endpoint = url[url.length - 1];
      const response = JSON.parse(error.request.response);
      if (endpoint === 'devices' && response.message === 'Resource exists') {
        yield updateDeviceToken();
        return;
      } else if (endpoint === 'token' && response.code === 'invalid_grant') {
        yield put({ type: LOGIN_REQUEST_ERROR, error: 'Email o contraseña incorrectos.' });
        return;
      }
    }
    yield put({ type: LOGIN_REQUEST_ERROR, error: DEFAULT_ERROR_MESSAGE });
  }
}

export function* backgroundLogin({ username, password }) {
  try {
    const body = querystring.stringify({
      password,
      username,
      client_device_id: deviceUtils.identifier,
      grant_type: 'password',
    });
    const userPayload = yield call(loginService.login, body);
    yield call(loginUtils.setLocalStorage, userPayload);
    const devicePayload = yield call(devices.post, deviceUtils);
    yield call(loginUtils.setDeviceID, devicePayload.id);
    yield all([
      put({ type: LOGIN_SUCCESSFUL, devicePayload }),
      put({ type: BACKGROUND_LOGIN_SUCCESS }),
    ]);
  } catch (error) {
    if (error.request != null && error.request.status === 400) {
      const url = error.request.responseURL.split('/');
      const endpoint = url[url.length - 1];
      const response = JSON.parse(error.request.response);
      if (endpoint === 'devices' && response.message === 'Resource exists') {
        yield updateDeviceToken();
        return;
      }
    }
    yield put({ type: LOGIN_REQUEST_ERROR, error: DEFAULT_ERROR_MESSAGE });
  }
}

export function* logoutFlow() {
  try {
    const vendorId = localStorage.getItem(DEVICE_IDENTIFIER);
    const device = yield call(devices.get, { identifier: vendorId });
    if (device.length > 0) {
      yield call(devices.deleteDevice, device[0].id);
    }
  } catch (error) {
    // If it fails in the try block means either the device did not exists
    // or we did not have permission to delente such device. In both cases
    // we do nothing.
  } finally {
    yield put({ type: LOGOUT_SUCCESSFUL });
    localStorage.clear();
    window.location.reload();
  }
}

export default function* rootLoginSaga() {
  yield all([
    takeEvery(LOGIN_REQUEST, loginFlow),
    takeEvery(LOGOUT_REQUEST, logoutFlow),
    takeEvery(BACKGROUND_LOGIN, backgroundLogin),
  ]);
}
