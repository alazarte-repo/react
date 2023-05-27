/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import accountService from '../services/account';
import { notifyError } from '../actions/actionStatus';
import {
  accountCreate,
  accountLogin,
  checkUsername,
} from './account';
import {
  ACCOUNT_CREATE,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_CREATE_ERROR,
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_CLEAR_ERROR,
  ACCOUNT_CHECK_USERNAME,
  ACCOUNT_CHECK_USERNAME_SUCCESS,
} from '../constants';

const accountInformation = {
  account: {
    name: 'Test Creation',
    address: {
      country: 'AR',
    },
  },
  user: {
    username: 'test@example.com',
    first_name: 'Test',
    last_name: 'Creation',
    password: '12345',
    security_pin: '1234',
  },
};

const token = {
  access_token: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjb20ubWFnZW50YS5wdWJsaWMiLCJleHAiOjkwMCwiZ3JvdXBzIjpbImFwaV9jbGllbnRzIl0sImlhdCI6MTU0OTQ3Nzg1MiwiaWQiOjU2MTQyNjUzMzUzNzQ2NTEsImlzcyI6Ind2c2JwaHU0cmZ4OXN2cXprd3h0NXQ5dGtmeGZjMjliIiwia2lkIjoiOTA3MzA1MzEiLCJtZXRhIjp7fSwic3ViIjoid3ZzYnBodTRyZng5c3Zxemt3eHQ1dDl0a2Z4ZmMyOWIifQ.i7P1HkDRp3j6V8Duqgsy789tOM6e0D-IB87IwQMo4iTn68YzpFANrN8Mq2047508-XtGS0Yu6dvXtqO5aqefkQ',
  expires_in: 900,
  refresh_token: 'vRNnM4L4SblzMjN8KBG81MJIYj1OupmpqOGfFlo2',
  scope: 'api_clients',
  token_type: 'bearer',
};

const serializedToken = {
  accessToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjb20ubWFnZW50YS5wdWJsaWMiLCJleHAiOjkwMCwiZ3JvdXBzIjpbImFwaV9jbGllbnRzIl0sImlhdCI6MTU0OTQ3Nzg1MiwiaWQiOjU2MTQyNjUzMzUzNzQ2NTEsImlzcyI6Ind2c2JwaHU0cmZ4OXN2cXprd3h0NXQ5dGtmeGZjMjliIiwia2lkIjoiOTA3MzA1MzEiLCJtZXRhIjp7fSwic3ViIjoid3ZzYnBodTRyZng5c3Zxemt3eHQ1dDl0a2Z4ZmMyOWIifQ.i7P1HkDRp3j6V8Duqgsy789tOM6e0D-IB87IwQMo4iTn68YzpFANrN8Mq2047508-XtGS0Yu6dvXtqO5aqefkQ',
  expiresIn: 900,
  refreshToken: 'vRNnM4L4SblzMjN8KBG81MJIYj1OupmpqOGfFlo2',
  scope: 'api_clients',
  tokenType: 'bearer',
};

describe('account saga test', () => {
  it('should create a new account', () => {
    const action = { type: ACCOUNT_CREATE, accountInformation };
    testSaga(accountCreate, action)
      .next()
      .call(accountService.getRegisterToken, action.accountInformation)
      .next(token)
      .call(accountService.create, action.accountInformation, serializedToken)
      .next()
      .put({
        type: ACCOUNT_CREATE_SUCCESS,
        username: accountInformation.user.username,
        password: accountInformation.user.password,
      })
      .next()
      .isDone();
  });

  it('should notify the username is taken error', () => {
    const action = { type: ACCOUNT_CREATE, accountInformation };
    const error = {
      response: {
        status: 400,
        data: {
          code: 'wamp.error.invalid_argument',
          message: 'Invalid Username.',
        },
      },
    };
    testSaga(accountCreate, action)
      .next()
      .call(accountService.getRegisterToken, action.accountInformation)
      .throw(error)
      .put({
        type: ACCOUNT_CREATE_ERROR,
        message: error.response.data.message,
      })
      .next()
      .isDone();
  });

  it('should notify an error ocurred', () => {
    const action = { type: ACCOUNT_CREATE, accountInformation };
    const error = {
      response: {
        status: 400,
        data: {
          message: 'UNKNOWN MESSAGE',
        },
      },
    };
    testSaga(accountCreate, action)
      .next()
      .call(accountService.getRegisterToken, action.accountInformation)
      .throw(error)
      .put({
        type: ACCOUNT_CREATE_ERROR,
        message: 'Se ha producido un error al crear la cuenta. Por favor intente de nuevo más tarde.',
      })
      .next()
      .isDone();
  });

  it('should notify an error ocurred creating account', () => {
    const action = { type: ACCOUNT_CREATE, accountInformation };
    testSaga(accountCreate, action)
      .next()
      .call(accountService.getRegisterToken, action.accountInformation)
      .throw(new Error('error'))
      .put({
        type: ACCOUNT_CREATE_ERROR,
        message: 'Se ha producido un error al crear la cuenta. Por favor intente de nuevo más tarde.',
      })
      .next()
      .isDone();
  });

  it('should log in into new account', () => {
    const action = {
      type: ACCOUNT_CREATE_SUCCESS,
      username: 'test@example.com',
      password: '12345',
    };
    testSaga(accountLogin, action)
      .next()
      .put({
        type: LOGIN_REQUEST,
        data: {
          username: action.username,
          password: action.password,
        },
      })
      .next();
  });

  it('should notify login error', () => {
    const action = {
      type: ACCOUNT_CREATE_SUCCESS,
      username: 'test@example.com',
      password: '12345',
    };
    testSaga(accountLogin, action)
      .next()
      .put({
        type: LOGIN_REQUEST,
        data: {
          username: action.username,
          password: action.password,
        },
      })
      .next()
      .take(LOGIN_REQUEST_ERROR)
      .next(LOGIN_REQUEST_ERROR)
      .put({ type: LOGIN_CLEAR_ERROR })
      .next()
      .put({
        type: LOGIN_REQUEST_ERROR,
        error: 'Se ha producido un error al querer ingresar a la cuenta. Por favor intente de nuevo más tarde.',
      })
      .next()
      .put(push('/login'))
      .next()
      .isDone();
  });

  it('should check if username exists, notify that exists', () => {
    const action = {
      type: ACCOUNT_CHECK_USERNAME,
      username: 'test@example.com',
    };
    testSaga(checkUsername, action)
      .next()
      .call(accountService.getRegisterToken)
      .next(token)
      .call(accountService.checkUsername, action.username, serializedToken)
      .next(true)
      .put({ type: ACCOUNT_CHECK_USERNAME_SUCCESS, usernameExists: true })
      .next()
      .isDone();
  });

  it('should check if username exists, notify that DOES NOT exists', () => {
    const action = {
      type: ACCOUNT_CHECK_USERNAME,
      username: 'test@example.com',
    };
    testSaga(checkUsername, action)
      .next()
      .call(accountService.getRegisterToken)
      .next(token)
      .call(accountService.checkUsername, action.username, serializedToken)
      .next(false)
      .put({ type: ACCOUNT_CHECK_USERNAME_SUCCESS, usernameExists: false })
      .next()
      .isDone();
  });

  it('should notify that there was an error checking username', () => {
    const action = {
      type: ACCOUNT_CHECK_USERNAME,
      username: 'test@example.com',
    };
    testSaga(checkUsername, action)
      .next()
      .call(accountService.getRegisterToken)
      .next(token)
      .call(accountService.checkUsername, action.username, serializedToken)
      .next(null)
      .put(notifyError('Ha ocurrido un error verificando el usuario, por favor intente denuevo en unos minutos'))
      .next()
      .isDone();
  });

  it('should notify that there was an error checking username 2', () => {
    const action = {
      type: ACCOUNT_CHECK_USERNAME,
      username: 'test@example.com',
    };
    testSaga(checkUsername, action)
      .next()
      .call(accountService.getRegisterToken)
      .throw(new Error('error'))
      .put(notifyError('Ha ocurrido un error verificando el usuario, por favor intente denuevo en unos minutos'))
      .next()
      .isDone();
  });
});
