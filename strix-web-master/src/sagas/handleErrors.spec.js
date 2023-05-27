
/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { isAppOffline } from '../selectors/AppState.selector';
import { handleHttpErrors } from './handleErrors';
import {
  APP_IS_ONLINE,
  APP_IS_OFFLINE,
  REFRESH_TOKEN,
  ERROR,
} from '../constants';

function* successfulSaga() {
  yield true;
}

function* unsuccessfulSaga() {
  yield false;
  throw new Error('error');
}

const ERROR_MESSAGE = 'Ha ocurrido un error';

const error401 = Error('error');
error401.request = { status: 401 };

function* unsuccessfulSaga401(action) {
  yield action.type;
  throw error401;
}

const error0 = Error('Network Error');
error0.request = { status: 0 };

function* unsuccessfulSaga0(action) {
  yield action.type;
  throw error0;
}

const error500 = Error('error');
error500.request = { status: 500 };


function* unsuccessfulSaga500(action) {
  yield action.type;
  throw error500;
}

describe('handleErrors saga decorator', () => {
  it('should execute a successful saga withouth failing', () => {
    testSaga(handleHttpErrors(successfulSaga))
      .next()
      .next(true)
      .select(isAppOffline)
      .next(false)
      .isDone();
  });

  it('should execute a successful saga withouth failing and put app state back to online', () => {
    testSaga(handleHttpErrors(successfulSaga))
      .next()
      .next(true)
      .select(isAppOffline)
      .next(true)
      .put({ type: APP_IS_ONLINE })
      .next()
      .isDone();
  });

  it('should refresh token when there is an error', () => {
    const action = { type: 'TEST' };
    const error401Saga = handleHttpErrors(unsuccessfulSaga401);
    testSaga(error401Saga, action)
      .next()
      .next(action.type)
      .put({ type: REFRESH_TOKEN, dispatcher: action })
      .next()
      .isDone();
  });

  it('should refresh token when there is an error and retry flag is true', () => {
    const action = { type: 'TEST', retryOn401: true };
    const error401Saga = handleHttpErrors(unsuccessfulSaga401);
    testSaga(error401Saga, action)
      .next()
      .next(action.type)
      .put({ type: REFRESH_TOKEN, dispatcher: action })
      .next()
      .isDone();
  });

  it('should notify app is offline if there is a network error', () => {
    const action = { type: 'TEST' };
    const error0Saga = handleHttpErrors(unsuccessfulSaga0);
    testSaga(error0Saga, action)
      .next()
      .next(action.type)
      .put({ type: APP_IS_OFFLINE })
      .next()
      .isDone();
  });

  it('should NOT refresh token when there is an error and retry flag is false', () => {
    const action = { type: 'TEST', retryOn401: false };
    const error401Saga = handleHttpErrors(unsuccessfulSaga401);
    testSaga(error401Saga, action)
      .next()
      .next(action.type)
      .next()
      .isDone();
  });

  it('should notify error if code is not handled', () => {
    const action = { type: 'TEST' };
    const error500Saga = handleHttpErrors(unsuccessfulSaga500);
    testSaga(error500Saga, action)
      .next()
      .next(action.type)
      .put({ type: ERROR, state: { status: true, message: ERROR_MESSAGE } })
      .next()
      .isDone();
  });

  it('should do nothing if was not a request error', () => {
    testSaga(handleHttpErrors(unsuccessfulSaga))
      .next()
      .next(false)
      .put({ type: ERROR, state: { status: true, message: ERROR_MESSAGE } })
      .next()
      .isDone();
  });
});
