import {
  GET_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  GET_UNREAD_NOTIFICATIONS,
  NOTIFICATION_MODAL_OPENED,
  NOTIFICATION_MODAL_CLOSED,
  NOTIFICATION_SCREEN_OPENED,
  NOTIFICATION_SCREEN_CLOSED,
} from '../constants';

export const getNotifications = page => ({
  type: GET_NOTIFICATIONS,
  page,
});

export const markNotificationAsRead = ids => ({
  type: MARK_NOTIFICATION_AS_READ,
  ids,
});
export const updateNotificationsSuccessful = newNotifications => ({
  type: 'GET_NOTIFICATIONS_SUCCESSFUL',
  newNotifications,
});

export const getUnreadNotifications = () => ({
  type: GET_UNREAD_NOTIFICATIONS,
});

export const notificationModalOpened = () => ({
  type: NOTIFICATION_MODAL_OPENED,
});

export const notificationModalClosed = () => ({
  type: NOTIFICATION_MODAL_CLOSED,
});

export const notificationScreenOpened = () => ({
  type: NOTIFICATION_SCREEN_OPENED,
});

export const notificationScreenClosed = () => ({
  type: NOTIFICATION_SCREEN_CLOSED,
});
