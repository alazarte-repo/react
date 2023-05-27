import { fromJS } from 'immutable';
import {
  GET_NOTIFICATIONS_SUCCESSFUL,
  GET_UNREAD_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_SCREEN_OPENED,
  NOTIFICATION_SCREEN_CLOSED,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  NOTIFICATION_MODAL_OPENED,
  NOTIFICATION_MODAL_CLOSED,
  GET_NOTIFICATIONS,
} from '../constants';

const initialState = fromJS({
  list: [],
  unreadList: [],
  unreadNumber: 0,
  notificationModalIsOpened: false,
  notificationScreenIsOpened: false,
  loading: false,
  page: 1,
});

function processNotifications(state, newNotifications, page) {
  const currentNotifications = state.get('list');
  const isScreenOpened = state.get('notificationScreenIsOpened') || state.get('notificationModalIsOpened');
  /* eslint-disable eqeqeq */
  const thereAreNewNotifications = page == 1 && ((currentNotifications.size > 0 && currentNotifications.get(0).get('id') !== newNotifications[0].id) || currentNotifications.size === 0);
  if (!isScreenOpened) {
    // Check if there are new notifications, if not, we just return the old state.
    if (!thereAreNewNotifications) {
      return state;
    }
    // Otherwise modal is closed and there are new notifications, we just replace the page
    return state.set('list', fromJS(newNotifications));
  }

  // If modal is opened and there are new notifications, we replacethe first page only
  if (isScreenOpened) {
    if (thereAreNewNotifications) {
      /* eslint-disable max-len */
      const lastIndex = currentNotifications.findIndex(x => x.get('id') === newNotifications[newNotifications.length - 1].id);
      const currentList = state.get('list').slice(lastIndex + 1);
      return state.set('list', fromJS(newNotifications).concat(currentList));
    }

    if (page != 1) {
      const previousPageIds = currentNotifications.slice((page - 1) * 15, page * 15).map(x => x.get('id'));
      const filteredNotifications = newNotifications.filter(x => !previousPageIds.includes(x.id));
      return state.update('list', list => list.concat(fromJS(filteredNotifications)));
    }
  }

  return state;
}

function markNotificationAsRead(state) {
  return state.set('list', state.get('list').map(notification => notification.set('read', true)));
}

function onExitNotificationScreens(state) {
  let newState = state;
  if (!newState.get('notificationModalIsOpened') &&
  !newState.get('notificationScreenIsOpened')) {
    newState = newState.set('list', state.get('list').slice(0, 15));
    newState = markNotificationAsRead(newState);
    newState = newState.set('unreadNumber', 0);
    newState = newState.set('page', 1);
  }
  return newState;
}

function onNotificationModalOpened(state) {
  let newState = state;
  // Mark visible notifications as read IN COUNTER ONLY
  newState = newState.set('notificationModalIsOpened', true);
  newState = newState.set('unreadNumber', 0);
  return newState;
}

function getUnreadNotificationsSuccess(state, unreadNotifications) {
  const isScreenOpened = state.get('notificationScreenIsOpened') || state.get('notificationModalIsOpened');
  const newState = state.set('unreadList', unreadNotifications.map(x => x.id));
  if (!isScreenOpened) {
    return newState.set('unreadNumber', unreadNotifications.length);
  }

  return newState;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return state.set('loading', true);
    case GET_NOTIFICATIONS_SUCCESSFUL: {
      let newNotifications = processNotifications(state, action.newNotifications, action.page);
      newNotifications = newNotifications.set('loading', false);
      return action.fromBackSync
        ? newNotifications
        : newNotifications.set('page', newNotifications.get('page') + 1);
    }
    case GET_UNREAD_NOTIFICATIONS_SUCCESS:
      return getUnreadNotificationsSuccess(state, action.unread);
    case NOTIFICATION_MODAL_OPENED:
      return onNotificationModalOpened(state);
    case NOTIFICATION_MODAL_CLOSED:
      return onExitNotificationScreens(state.set('notificationModalIsOpened', false));
    case NOTIFICATION_SCREEN_OPENED:
      return state.set('notificationScreenIsOpened', true);
    case NOTIFICATION_SCREEN_CLOSED:
      return onExitNotificationScreens(state.set('notificationScreenIsOpened', false));
    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      return markNotificationAsRead(state);
    default:
      return state;
  }
}
