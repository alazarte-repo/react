/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';
import { updateSharedLocations } from '../actions/sharedLocations';
import { getUnreadNotifications } from '../actions/topBar';
import rootDelayedDispatcherSaga, { Dispatcher } from './delayedDispatcher';
import localStorageMock from '../../tools/mock-api-tools/localStorage';
import {
  UPDATE_THINGS,
  GET_NOTIFICATIONS,
  START_BACKGROUND_SYNC,
  STOP_BACKGROUND_SYNC,
} from '../constants';

window.localStorage = localStorageMock;

describe('delayedDispatcher saga test', () => {
  it('should dispatch if its logged', () => {
    localStorage.setItem('isAuthenticated', 'true');
    testSaga(Dispatcher, {})
      .next()
      .next() // Delay
      .put(getUnreadNotifications())
      .next()
      .put({ type: GET_NOTIFICATIONS, page: 1, fromBackSync: true })
      .next()
      .put({ type: UPDATE_THINGS })
      .next()
      .put(updateSharedLocations())
      .next();
  });

  it('should not dispatch if its not logged', () => {
    localStorage.setItem('isAuthenticated', 'false');
    testSaga(Dispatcher, {})
      .next()
      .isDone();
  });

  it('should cancel dispatcher if stop sync arrives and starts waiting the start event', () => {
    const bgSyncTask = createMockTask();
    testSaga(rootDelayedDispatcherSaga)
      .next()
      .take(START_BACKGROUND_SYNC)
      .next(START_BACKGROUND_SYNC)
      .fork(Dispatcher)
      .next(bgSyncTask)
      .take(STOP_BACKGROUND_SYNC)
      .next(STOP_BACKGROUND_SYNC)
      .cancel(bgSyncTask)
      .next()
      .take(START_BACKGROUND_SYNC);
  });
});
