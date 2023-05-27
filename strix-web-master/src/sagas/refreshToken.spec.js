/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { refreshToken, refreshTokenError, dispatchActions } from './refreshToken';
import { getRefreshingTokenState } from '../selectors/LeftPanel.selector';
import { loginService } from '../services';
import localStorageMock from '../../tools/mock-api-tools/localStorage';

import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_TOKEN_ERROR,
  STOP_BACKGROUND_SYNC,
} from '../constants';

window.localStorage = localStorageMock;
const LOCALSTORAGE_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjb20ubWFnZW50YS5wdWJsaWMiLCJleHAiOjkwMCwiZ3JvdXBzIjpbInJlc291cmNlX293bmVycyIsImFjY291bnRfYWRtaW4iXSwiaWF0IjoxNTMyNTI2MDQ1LCJpZCI6ODE2MTk2OTc4NjczNjMwMywiaXNzIjoiZ3d2dWZzdnhucHJnY2VydnNyZTdndmp2NXk5ZHN1eWQiLCJraWQiOiI5ODA3MDQ3IiwibWV0YSI6eyJhY2NvdW50X2lkIjoibXJuOmFjY291bnQ6MmY0ZjNiN2QtOTFmYy00MmVmLThkZTctNTEwMzFjMzY5Njk0IiwidXNlcl9pZCI6Im1ybjp1c2VyOjczOGQzZjQxLTA0ZDQtNDdmOC05YjM1LThjMTA5ODRlNDA2MiJ9LCJzdWIiOiJ0ZXN0MTIzQGxvamFjay5jb20uYXIifQ.nU8LrgU5aQoAb6zgTZNVkD8_4ZwEBA3bA4OnSYAfDE6g21afDakT9r9dkyIh7jJ5npUbk0UZ6zP71NI9brCsAg';
const LOCALSTORAGE_REFRESH_TOKEN = '6ILrlHbHNcnTwqG8RMoZmE4mT9QuS9KGVnPTIvUZ';

const LOCALSTORAGE_TOKEN2 = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjb20ubWFnZW50YS5wdWJsaWMiLCJleHAiOjkwMCwiZ3JvdXBzIjpbInJlc291cmNlX293bmVycyIsImFjY291bnRfYWRtaW4iXSwiaWF0IjoxNTMyNTI2OTcxLCJpZCI6NzkxMjA0NjUxNDY1MTkwMiwiaXNzIjoid3ZzYnBodTRyZng5c3Zxemt3eHQ1dDl0a2Z4ZmMyOWIiLCJraWQiOiI2MzQ0OTU1OSIsIm1ldGEiOnsiYWNjb3VudF9pZCI6Im1ybjphY2NvdW50OjEzYWIyNDkzLWFkYmUtNDg0ZC05Y2I1LThkNGQ5YWYxZjVjNSIsInVzZXJfaWQiOiJtcm46dXNlcjo5NzRlNzljMC05ZWI3LTQ0OWEtYTRkZC04NzI5YmY4NjA3NTEifSwic3ViIjoidGVzdC5uaWNvQGxvamFjay5jb20uYXIifQ.tLSO6z2i-OqnC-9JZoqzJ-dwzUrSbpQ0Vo_YoFZ9zwz8rd9nKi5-XPtR0weTLIGoVwDXxRx7ABmMaSWyODgXHg';
const LOCALSTORAGE_REFRESH_TOKEN2 = 'g3fT57Yo18xKDUguCsznulx9I0ze9HiLDo05hPKP';

describe('refreshToken saga test', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should stop background sync when refresh token fails', () => {
    const action = { type: REFRESH_TOKEN_ERROR };
    testSaga(refreshTokenError, action)
      .next()
      .put({ type: STOP_BACKGROUND_SYNC })
      .next()
      .isDone();
  });

  it('should add failed actions to queue', () => {
    const action = {
      type: REFRESH_TOKEN,
      dispatcher: { type: 'TEST' },
    };
    testSaga(refreshToken, action)
      .next()
      .select(getRefreshingTokenState)
      .next(true)
      .isDone();
  });

  it('should refresh token if not refreshing', () => {
    const action = {
      type: REFRESH_TOKEN,
      dispatcher: { type: 'TEST' },
    };
    localStorageMock.setItem('TOKEN', LOCALSTORAGE_TOKEN);
    localStorageMock.setItem('REFRESH_TOKEN', LOCALSTORAGE_REFRESH_TOKEN);
    const actionPool = [action.dispatcher, action.dispatcher];
    const loginResponse = {
      access_token: LOCALSTORAGE_TOKEN2,
      refresh_token: LOCALSTORAGE_REFRESH_TOKEN2,
    };
    testSaga(refreshToken, action)
      .next()
      .select(getRefreshingTokenState)
      .next(false)
      .put({ type: REFRESH_TOKEN_REQUEST, isRefreshing: true })
      .next()
      .call(loginService.login, `refresh_token=${LOCALSTORAGE_REFRESH_TOKEN}&grant_type=refresh_token`)
      .next(loginResponse)
      .call(dispatchActions, actionPool)
      .next()
      .put({ type: REFRESH_SUCCESS })
      .next()
      .isDone();
  });

  it('should go to login if it fails', () => {
    const action = {
      type: REFRESH_TOKEN,
      dispatcher: { type: 'TEST' },
    };
    localStorageMock.setItem('TOKEN', LOCALSTORAGE_TOKEN);
    localStorageMock.setItem('REFRESH_TOKEN', LOCALSTORAGE_REFRESH_TOKEN);
    const error = new Error('error');
    testSaga(refreshToken, action)
      .next()
      .select(getRefreshingTokenState)
      .next(false)
      .put({ type: REFRESH_TOKEN_REQUEST, isRefreshing: true })
      .next()
      .throw(error)
      .put({ type: REFRESH_TOKEN_ERROR, err: error })
      .next()
      .put(push('/login'))
      .next()
      .isDone();
  });

  it('should redispatch actions', () => {
    const test1 = { type: 'TEST' };
    const test2 = { type: 'TEST2' };
    const actions = [test1, test2];
    testSaga(dispatchActions, actions)
      .next()
      .put(test1)
      .next()
      .put(test2)
      .next()
      .isDone();
  });
});
