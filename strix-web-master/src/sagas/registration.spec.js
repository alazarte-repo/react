/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga/effects';
import { createPassword, createPin } from './registration';
import { forgotPassword, userDataService } from '../services';
import {
  CREATE_PASSWORD,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PIN,
  CREATE_PIN_SUCCESS,
  BACKGROUND_LOGIN,
  TOKEN_EXPIRED,
} from '../constants';

const USERNAME = 'test@example.com';
const CODE = '1234';
const PASSWORD = '12345';
const PIN = '4321';

const changePinResponse = {
  account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
  active: true,
  birthday: '1977-05-30',
  created_by: 'w27dj7hrytmqajuanmbx66zqnxg6mk5s',
  created_timestamp: 1527882376905,
  first_name: 'John',
  genre: 'M',
  id: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  last_modified_by: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  last_modified_timestamp: 1530709223201,
  last_name: 'Doe',
  middle_name: 'E',
  push_notifications_enabled: false,
  security_pin: '4321',
  signup_completed: false,
  username: 'test@example.com',
};

describe('registration saga test', () => {
  it('should create a password', () => {
    const action = {
      type: CREATE_PASSWORD,
      password: PASSWORD,
      code: CODE,
      username: USERNAME,
    };
    testSaga(createPassword, action)
      .next()
      .call(forgotPassword.resetPassword, {
        password: PASSWORD,
        code: CODE,
        username: USERNAME,
      })
      .next()
      .all([
        put({ type: BACKGROUND_LOGIN, username: action.username, password: action.password }),
        put({ type: CREATE_PASSWORD_SUCCESS }),
      ])
      .next()
      .isDone();
  });

  it('should send TOKEN_EXPIRED action if user creation fails', () => {
    const action = {
      type: CREATE_PASSWORD,
      password: PASSWORD,
      code: CODE,
      username: USERNAME,
    };
    testSaga(createPassword, action)
      .next()
      .call(forgotPassword.resetPassword, {
        password: PASSWORD,
        code: CODE,
        username: USERNAME,
      })
      .next()
      .throw()
      .put({ type: TOKEN_EXPIRED })
      .next()
      .isDone();
  });

  it('should change pin', () => {
    const action = {
      type: CREATE_PIN,
      pin: PIN,
    };
    const body = [{ action: 'update', path: '/security_pin', value: PIN }];
    testSaga(createPin, action)
      .next()
      .call(userDataService.changePin, body)
      .next(changePinResponse)
      .put({ type: CREATE_PIN_SUCCESS, userData: changePinResponse })
      .next()
      .isDone();
  });

  it('should send TOKEN_EXPIRED action if pin creation fails', () => {
    const action = {
      type: CREATE_PIN,
      pin: PIN,
    };
    const body = [{ action: 'update', path: '/security_pin', value: PIN }];
    testSaga(createPin, action)
      .next()
      .call(userDataService.changePin, body)
      .next()
      .throw()
      .put({ type: TOKEN_EXPIRED })
      .next()
      .isDone();
  });
});

