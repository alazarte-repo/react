import { put, fork, take, cancel, all, takeLatest, delay } from 'redux-saga/effects';
import { updateSharedLocations } from '../actions/sharedLocations';
import { getUnreadNotifications } from '../actions/topBar';
import { getAgents } from '../actions/agents';
import {
  UPDATE_THINGS,
  GET_NOTIFICATIONS,
  START_BACKGROUND_SYNC,
  STOP_BACKGROUND_SYNC,
  APP_FORCE_REFRESH,
} from '../constants';

function* refresh() {
  yield put(getUnreadNotifications());
  yield put({ type: GET_NOTIFICATIONS, page: 1, fromBackSync: true });
  yield put({ type: UPDATE_THINGS });
  yield put(updateSharedLocations());
  yield put(getAgents());
}

export function* Dispatcher() {
  while (localStorage.getItem('isAuthenticated') === 'true') {
    yield delay(30000);
    yield* refresh();
  }
}

export function* forceRefresh() {
  yield* refresh();
}

export default function* rootDelayedDispatcherSaga() {
  while (yield take(START_BACKGROUND_SYNC)) {
    // Fork the proccess that syncs in background
    const bgSyncTask = yield fork(Dispatcher);

    // Wait for the user stop action
    yield take(STOP_BACKGROUND_SYNC);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask);
  }
}

export function* rootDispatcherSaga() {
  yield all([
    takeLatest(APP_FORCE_REFRESH, forceRefresh),
  ]);
}
