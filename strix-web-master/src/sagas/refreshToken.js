import { put, takeEvery, call, select } from 'redux-saga/effects';
import querystring from 'querystring';
import { push } from 'connected-react-router';
import { getRefreshingTokenState } from '../selectors/LeftPanel.selector';
import { loginService } from '../services';


import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_TOKEN_ERROR,
  STOP_BACKGROUND_SYNC,
} from '../constants';

let actionPool = [];

export function* dispatchActions(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    yield put(arr[i]);
  }
}

export function* refreshToken(action) {
  try {
    const body = {
      refresh_token: localStorage.getItem('REFRESH_TOKEN'),
      grant_type: 'refresh_token',
    };

    actionPool.push(action.dispatcher);
    const isRefreshing = yield select(getRefreshingTokenState);

    if (!isRefreshing) {
      yield put({ type: REFRESH_TOKEN_REQUEST, isRefreshing: true });
      const refreshService = yield call(loginService.login, querystring.stringify(body));
      localStorage.setItem('TOKEN', refreshService.access_token);
      localStorage.setItem('REFRESH_TOKEN', refreshService.refresh_token);
      yield call(dispatchActions, actionPool);
      yield put({ type: REFRESH_SUCCESS });
      actionPool = [];
    }
  } catch (err) {
    yield put({ type: REFRESH_TOKEN_ERROR, err });
    localStorage.setItem('isAuthenticated', false);
    yield put(push('/login'));
  }
}

export function* refreshTokenError() {
  yield put({ type: STOP_BACKGROUND_SYNC });
}

export default function* rootRefreshTokenSaga() {
  yield takeEvery(REFRESH_TOKEN, refreshToken);
  yield takeEvery(REFRESH_TOKEN_ERROR, refreshTokenError);
}
