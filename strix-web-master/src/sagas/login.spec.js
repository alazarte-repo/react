/* eslint-env jasmine */
import querystring from 'querystring';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { loginService, devices } from '../services';
import {
  loginFlow,
  backgroundLogin,
  logoutFlow,
} from './login';
import {
  LOGIN_CLEAR_ERROR,
  LOGIN_SUCCESSFUL,
  LOGIN_REQUEST_ERROR,
  BACKGROUND_LOGIN,
  BACKGROUND_LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESSFUL,
} from '../constants';
import loginUtils from '../utils/login';
import deviceUtils from '../utils/device';
import localStorageMock from '../../tools/mock-api-tools/localStorage';

window.localStorage = localStorageMock;

const LOCALSTORAGE_DEVICE_ID = 'mrn:device:6bcc73ba-2810-56cb-b243-c18750ea8f92';
const VENDOR_ID = '6b2d9dfe-5230-092b-a886-c59ec5df004d';

describe('login flow sagas test', () => {
  it('A user should log in', () => {
    const data = { password: 'callefalsa123', username: 'mauricio' };
    const action = { data };
    const bodyLogin = {
      ...data,
      client_device_id: deviceUtils.identifier,
      grant_type: 'password',
    };
    const expectedLogin = {
      access_token: '5T5vwRDBrrP',
      scope: 'resource_owners,account_admin',
      token_type: 'bearer',
    };
    const devicePayload = {
      account_id: 'mrn:account:4356',
      created_timestamp: 1527710323630,
      id: 'mrn:device:666',
    };

    testSaga(loginFlow, action)
      .next()
      .put({ type: LOGIN_CLEAR_ERROR })
      .next()
      .call(loginService.login, querystring.stringify(bodyLogin))
      .next(expectedLogin)
      .call(loginUtils.setLocalStorage, expectedLogin)
      .next()
      .call(devices.post, deviceUtils)
      .next(devicePayload)
      .call(loginUtils.setDeviceID, devicePayload.id)
      .next()
      .put(push('/dashboard'))
      .next()
      .put({ type: LOGIN_SUCCESSFUL, devicePayload })
      .next()
      .isDone();
  });

  it('notify error when login fails', () => {
    const data = { password: 'callefalsa123', username: 'mauricio' };
    const action = { data };
    const bodyLogin = {
      ...data,
      client_device_id: deviceUtils.identifier,
      grant_type: 'password',
    };

    testSaga(loginFlow, action)
      .next()
      .put({ type: LOGIN_CLEAR_ERROR })
      .next()
      .call(loginService.login, querystring.stringify(bodyLogin))
      .throw(new Error('error'))
      .put({
        type: LOGIN_REQUEST_ERROR,
        error: 'Ocurrió un error. Intente de nuevo en unos minutos.',
      })
      .next()
      .isDone();
  });

  it('should do background login ', () => {
    const action = {
      type: BACKGROUND_LOGIN,
      password: 'callefalsa123',
      username: 'mauricio',
    };
    const bodyLogin = `password=${action.password}&username=${action.username}&client_device_id=${deviceUtils.identifier}&grant_type=password`;
    const expectedLogin = {
      access_token: '5T5vwRDBrrP',
      scope: 'resource_owners,account_admin',
      token_type: 'bearer',
    };
    const devicePayload = {
      account_id: 'mrn:account:4356',
      created_timestamp: 1527710323630,
      id: 'mrn:device:666',
    };

    testSaga(backgroundLogin, action)
      .next()
      .call(loginService.login, bodyLogin)
      .next(expectedLogin)
      .call(loginUtils.setLocalStorage, expectedLogin)
      .next()
      .call(devices.post, deviceUtils)
      .next(devicePayload)
      .call(loginUtils.setDeviceID, devicePayload.id)
      .next()
      .all([
        put({ type: LOGIN_SUCCESSFUL, devicePayload }),
        put({ type: BACKGROUND_LOGIN_SUCCESS }),
      ])
      .next()
      .isDone();
  });

  it('notify error when background login fails', () => {
    const action = {
      type: BACKGROUND_LOGIN,
      password: 'callefalsa123',
      username: 'mauricio',
    };
    const bodyLogin = `password=${action.password}&username=${action.username}&client_device_id=${deviceUtils.identifier}&grant_type=password`;

    testSaga(backgroundLogin, action)
      .next()
      .call(loginService.login, bodyLogin)
      .throw(new Error('error'))
      .put({
        type: LOGIN_REQUEST_ERROR,
        error: 'Ocurrió un error. Intente de nuevo en unos minutos.',
      })
      .next()
      .isDone();
  });

  it('should logout', () => {
    const action = { type: LOGOUT_REQUEST };
    localStorage.setItem('DEVICE_IDENTIFIER', VENDOR_ID);
    testSaga(logoutFlow, action)
      .next()
      .call(devices.get, { identifier: VENDOR_ID })
      .next([{ id: LOCALSTORAGE_DEVICE_ID }])
      .call(devices.deleteDevice, LOCALSTORAGE_DEVICE_ID)
      .next()
      .put({ type: LOGOUT_SUCCESSFUL })
      .next()
      .isDone();

    expect(localStorage.store).toEqual({});
  });
});

