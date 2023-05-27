/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import {
  markNotificationAsRead,
  unreadNotifications,
  getNotifications,
} from './navBar';
import { notificationsService } from '../services';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESSFUL,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  GET_UNREAD_NOTIFICATIONS_SUCCESS,
  GET_UNREAD_NOTIFICATIONS,
} from '../constants';

const notificationsReceived = [
  {
    account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
    body: {
      html: '<html>\n\n<body>\n    <p>Strix informa que se detectó un inicio de sesión en un dispositivo nuevo (Chrome)</p>\n    <p>Si no fuiste vos, hacé\n        <a href=\'http://clientes.strix.com.ar/mydevices\'>click acá</a> para cerrar sesión en todos los dispositivos.</p>\n</body>\n\n</html>\n',
      plain: 'Strix informa que se detectó un inicio de sesión en un dispositivo nuevo (Chrome).',
    },
    channel: 'email',
    client_id: 'magenta',
    created_by: 'magenta_internal',
    created_timestamp: 1530208627776,
    dest: 'test@example.com',
    dismissed: false,
    event: {
      details: {
        name: 'Chrome',
        url: 'http://clientes.strix.com.ar/mydevices',
      },
    },
    event_type: 'com.magenta.events.devices.new_device',
    id: 'mrn:notification:10992a43-2994-4e83-8fe3-3c643aaef6b3',
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1530212282230,
    locale: 'es_AR',
    priority: 2,
    processed: true,
    read: false,
    ref: '<20180703190957.1.0AD16C34C088434A@mg.strix.com.ar>',
    subject: 'Nuevo dispositivo',
    timestamp: 1530208627756,
    user_id: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  },
  {
    account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
    body: {
      html: '<html>\n\n<body>\n    <p>Strix informa que se detectó un inicio de sesión en un dispositivo nuevo (Chrome)</p>\n    <p>Si no fuiste vos, hacé\n        <a href=\'http://clientes.strix.com.ar/mydevices\'>click acá</a> para cerrar sesión en todos los dispositivos.</p>\n</body>\n\n</html>\n',
      plain: 'Strix informa que se detectó un inicio de sesión en un dispositivo nuevo (Chrome).',
    },
    channel: 'email',
    client_id: 'magenta',
    created_by: 'magenta_internal',
    created_timestamp: 1528718437652,
    dest: 'test@example.com',
    dismissed: false,
    event: {
      details: {
        name: 'Chrome',
        url: 'http://clientes.strix.com.ar/mydevices',
      },
    },
    event_type: 'com.magenta.events.devices.new_device',
    id: 'mrn:notification:6bb58571-3602-4902-964a-2039ef78c947',
    last_modified_by: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
    last_modified_timestamp: 1530046082709,
    locale: 'es_AR',
    priority: 2,
    processed: true,
    read: true,
    ref: '<20180703144951.1.DD53BE3B7A0A057A@mg.strix.com.ar>',
    subject: 'Nuevo dispositivo',
    timestamp: 1528718437629,
    user_id: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  },
];

const processedNotificationsReceived = [
  {
    id: 'mrn:notification:10992a43-2994-4e83-8fe3-3c643aaef6b3',
    eventType: 'com.magenta.events.devices.new_device',
    detailType: 'with-link',
    icon: 'icon-email',
    subject: 'Nuevo dispositivo',
    body: 'Strix informa que se detectó un inicio de sesión en un dispositivo nuevo (Chrome).',
    timestamp: 1530208627756,
    humanizedTimestamp: '28/6/2018',
    date: 'Jueves, 28 de junio de 2018 14:57',
    eventDetail: {
      url: 'http://clientes.strix.com.ar/mydevices',
    },
    read: false,
  },
  {
    id: 'mrn:notification:6bb58571-3602-4902-964a-2039ef78c947',
    eventType: 'com.magenta.events.devices.new_device',
    detailType: 'with-link',
    icon: 'icon-email',
    subject: 'Nuevo dispositivo',
    body: 'Strix informa que se detectó un inicio de sesión en un dispositivo nuevo (Chrome).',
    timestamp: 1528718437629,
    humanizedTimestamp: '11/6/2018',
    date: 'Lunes, 11 de junio de 2018 09:00',
    eventDetail: {
      url: 'http://clientes.strix.com.ar/mydevices',
    },
    read: true,
  },
];


const unreadIds = [7, 8, 9, 10];

const unreadnotificationsReceived = [
  { id: 'mrn:notification:10992a43-2994-4e83-8fe3-3c643aaef6b3' },
  { id: 'mrn:notification:6bb58571-3602-4902-964a-2039ef78c947' },
];


describe('navBar saga test', () => {
  it('should get notifications and format them', () => {
    const action = { type: GET_NOTIFICATIONS, page: 1 };
    testSaga(getNotifications, action)
      .next()
      .call(notificationsService.getNotification, action.page)
      .next(notificationsReceived)
      // select TODO: Should define function inside select in selector's section
      .next({})
      .put({
        type: GET_NOTIFICATIONS_SUCCESSFUL,
        newNotifications: processedNotificationsReceived,
        page: action.page,
        fromBackSync: undefined,
      })
      .next()
      .isDone();
  });

  it('should get notifications and flag if they come from back sync', () => {
    const action = { type: GET_NOTIFICATIONS, page: 1, fromBackSync: true };
    testSaga(getNotifications, action)
      .next()
      .call(notificationsService.getNotification, action.page)
      .next(notificationsReceived)
      // select TODO: Should define function inside select in selector's section
      .next({})
      .put({
        type: GET_NOTIFICATIONS_SUCCESSFUL,
        newNotifications: processedNotificationsReceived,
        page: action.page,
        fromBackSync: action.fromBackSync,
      })
      .next()
      .isDone();
  });

  it('should get unread notifications', () => {
    const action = { type: GET_UNREAD_NOTIFICATIONS };
    testSaga(unreadNotifications, action)
      .next()
      .next() // delay
      .call(notificationsService.getUnreadNotificaions)
      .next(unreadnotificationsReceived)
      .put({
        type: GET_UNREAD_NOTIFICATIONS_SUCCESS,
        unread: unreadnotificationsReceived,
      })
      .next()
      .isDone();
  });

  it('should mark unread notifications as read', () => {
    const action = { type: MARK_NOTIFICATION_AS_READ, ids: unreadIds };
    const updateBody = unreadIds.map(id => ({
      action: 'update',
      path: `/${id}/read`,
      value: true,
    }));
    testSaga(markNotificationAsRead, action)
      .next()
      .call(notificationsService.markNotificationAsRead, updateBody)
      .next()
      .put({ type: MARK_NOTIFICATION_AS_READ_SUCCESS })
      .next()
      .isDone();
  });
});

