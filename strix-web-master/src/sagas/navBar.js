import { put, takeEvery, call, all, select, delay } from 'redux-saga/effects';
import { handleHttpErrors } from './handleErrors';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESSFUL,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  GET_UNREAD_NOTIFICATIONS_SUCCESS,
  GET_UNREAD_NOTIFICATIONS,
} from '../constants';
import { notificationsService } from '../services';
import serializeNotification from '../serializers/notification';

export function* getNotifications({ page, fromBackSync }) {
  let newNotifications = yield call(notificationsService.getNotification, page);
  const things = yield select(state => state.getIn(['things', 'list']));
  newNotifications = newNotifications.map(x => serializeNotification(x, things));
  yield put({ type: GET_NOTIFICATIONS_SUCCESSFUL, newNotifications, page, fromBackSync });
}

export function* unreadNotifications() {
  // We give the backend some time to update the indexes
  yield delay(1500);
  const notificationPayload = yield call(notificationsService.getUnreadNotificaions);
  yield put({ type: GET_UNREAD_NOTIFICATIONS_SUCCESS, unread: notificationPayload });
}

export function* markNotificationAsRead({ ids }) {
  const body = ids.map(id => ({
    action: 'update',
    path: `/${id}/read`,
    value: true,
  }));
  yield call(notificationsService.markNotificationAsRead, body);
  yield put({ type: MARK_NOTIFICATION_AS_READ_SUCCESS });
}

export default function* rootNavBarSaga() {
  yield all([
    yield takeEvery(GET_NOTIFICATIONS, handleHttpErrors(getNotifications, 'Ha ocurrido un error al traer tus notificaciones')),
    yield takeEvery(MARK_NOTIFICATION_AS_READ, handleHttpErrors(markNotificationAsRead)),
    yield takeEvery(GET_UNREAD_NOTIFICATIONS, handleHttpErrors(unreadNotifications)),
  ]);
}
