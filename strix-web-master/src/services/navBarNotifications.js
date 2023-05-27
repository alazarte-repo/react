import axios from 'axios';
import { baseUrl, getHeaders } from '../config';
import NotificationEventType from '../constants/notificationEventType';

const requestPath = '/notifications';
const resourceUrl = `${baseUrl}${requestPath}`;

const filteredNotificationTypes = [
  NotificationEventType.VerifyEmail,
];
const filteredNotificationQuery = filteredNotificationTypes
  .reduce((xs, x) => `${xs} AND event_type /= '${x}'`, '')
  .substring(5);

export default {
  getNotification: page =>
    axios
      .get(`${resourceUrl}/?_page=${page}&_sort=timestamp%2Bdesc&_limit=${15}&_q=${filteredNotificationQuery}`, {
        headers: getHeaders({ 'Accept-Language': 'es-AR' }),
      })
      .then(response => response.data),
  getUnreadNotificaions: () =>
    axios
      .get(`${resourceUrl}/?_p=id&read=false&_q=${filteredNotificationQuery}`, {
        headers: getHeaders(),
      })
      .then(response => response.data),
  markNotificationAsRead: body =>
    axios
      .patch(resourceUrl, body, {
        headers: getHeaders({ 'Accept-Language': 'es-AR' }),
      })
      .then(response => response.data),
};
