/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { getHistoryPage } from '../selectors/Things.selector';
import { remindersService, thingsService } from '../services';
import {
  getReminders,
  deleteReminder,
  reminderDone,
  changeReminderConfig,
  addReminders,
  getHistoryItems,
} from './reminders';
import {
  DELETE_REMINDER,
  GET_REMINDERS_SUCCESSFUL,
  DELETE_REMINDER_SUCCESS,
  MARK_SERVICE_DONE,
  SUCCESS,
  MARK_SERVICE_DONE_SUCCESS,
  CHANGE_REMINDER_CONFIG,
  GET_REMINDERS,
  ADD_REMINDERS,
  ADD_REMINDERS_SUCCESSFUL,
  REMINDERS_LOADING,
  REMINDERS_LOADING_ERROR,
  REMINDERS_GET_HISTORY_ITEMS,
  REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
} from '../constants';

const HISTORY_PAGE_SIZE = 10;
const reminderTypesMock = [
  {
    created_by: 'magenta_internal',
    created_timestamp: 1535107881943,
    description: 'Avisa cuando se debe realizar un Cambio de aceite al motor del auto',
    id: 'mrn:reminder_type:oil_change',
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1535107881943,
    name: 'Cambio de Aceite',
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    repeat: {
      days: 365,
      mileage: 10000,
    },
    thing_type: 'mrn:things:vehicle',
  },
  {
    created_by: 'magenta_internal',
    created_timestamp: 1534042466621,
    description: 'Avisa cuando se debe realizar la rotacion de las cubiertas del auto',
    id: 'mrn:reminder_type:tyre_rotation',
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1534042466621,
    name: 'Rotacion de Cubiertas',
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    repeat: {
      days: 365,
      mileage: 10000,
    },
    thing_type: 'mrn:things:vehicle',
  },
];

const remindersMock = [
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    active: true,
    country_id: 'AR',
    created_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    created_timestamp: 1530625073351,
    done_at: {
      date: '2018-07-03T00:00:00Z',
      mileage: 0,
    },
    id: 'mrn:reminder:56896c53-7c3c-44b8-8b45-5308535443fb',
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1532531192993,
    notifiable_at: false,
    notifiable_before: false,
    notified_at: 0,
    notified_before: 0,
    notify_at: {
      date: '2021-07-02T00:00:00Z',
      mileage: 60000,
    },
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    reminder_type_id: 'mrn:reminder_type:suspension_change',
    repeat: {
      days: 1095,
      mileage: 60000,
    },
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
  },
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    active: true,
    country_id: 'AR',
    created_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    created_timestamp: 1530025862087,
    done_at: {
      date: '2018-06-26T00:00:00Z',
      mileage: 0,
    },
    id: 'mrn:reminder:0376b05a-05da-4286-b946-fa1e137cd42e',
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1532531257432,
    notifiable_at: false,
    notifiable_before: false,
    notified_at: 0,
    notified_before: 0,
    notify_at: {
      date: '2019-06-26T00:00:00Z',
      mileage: 10000,
    },
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    reminder_type_id: 'mrn:reminder_type:tyre_rotation',
    repeat: {
      days: 365,
      mileage: 10000,
    },
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
  },
];

const processedRemindersMock = [
  {
    id: 'mrn:reminder:56896c53-7c3c-44b8-8b45-5308535443fb',
    name: 'Servicio',
    icon: 'suspension_change',
    type: 'mrn:reminder_type:suspension_change',
    repeat: {
      days: 1095,
      mileage: 60000,
    },
    notify_at: {
      date: '2021-07-02T00:00:00Z',
      mileage: 60000,
    },
    done_at: {
      date: '2018-07-03T00:00:00Z',
      mileage: 0,
    },
  },
  {
    id: 'mrn:reminder:0376b05a-05da-4286-b946-fa1e137cd42e',
    name: 'Rotacion de Cubiertas',
    icon: 'tire_rotation',
    type: 'mrn:reminder_type:tyre_rotation',
    repeat: {
      days: 365,
      mileage: 10000,
    },
    notify_at: {
      date: '2019-06-26T00:00:00Z',
      mileage: 10000,
    },
    done_at: {
      date: '2018-06-26T00:00:00Z',
      mileage: 0,
    },
  },
];

const reminderDoneMock = [
  {
    id: 'mrn:reminder:56896c53-7c3c-44b8-8b45-5308535443fb',
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
    reminder_type_id: 'mrn:reminder_type:suspension_change',
    active: true,
    notify_before: {
      mileage: 1000,
      days: 30,
    },
    repeat: {
      mileage: 10000,
      days: 365,
    },
    notes: 'some notes...',
    done_at: {
      mileage: 30000,
      date: '2016-10-12T16:25:11+00:00',
    },
    notify_at: {
      mileage: 40000,
      date: '2017-10-12T16:25:11+00:00',
    },
    created_timestamp: 1506104340184,
    created_by: 'mrn:user:38d72e6c-c81c-447a-a91a-1e3f291f1faf',
    last_modified_timestamp: 1506104340184,
    last_modified_by: 'mrn:user:38d72e6c-c81c-447a-a91a-1e3f291f1faf',
  },
  {
    id: 'mrn:reminder:0376b05a-05da-4286-b946-fa1e137cd42e',
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
    reminder_type_id: 'mrn:reminder_type:tyre_rotation',
    active: true,
    notify_before: {
      mileage: 1000,
      days: 30,
    },
    repeat: {
      mileage: 10000,
      days: 365,
    },
    notes: 'some notes...',
    done_at: {
      mileage: 30000,
      date: '2016-10-12T16:25:11+00:00',
    },
    notify_at: {
      mileage: 40000,
      date: '2017-10-12T16:25:11+00:00',
    },
    created_timestamp: 1506104340184,
    created_by: 'mrn:user:38d72e6c-c81c-447a-a91a-1e3f291f1faf',
    last_modified_timestamp: 1506104340184,
    last_modified_by: 'mrn:user:38d72e6c-c81c-447a-a91a-1e3f291f1faf',
  },
];

const reminderDoneMockProcessed = [
  {
    id: 'mrn:reminder:56896c53-7c3c-44b8-8b45-5308535443fb',
    name: 'Servicio',
    icon: 'suspension_change',
    type: 'mrn:reminder_type:suspension_change',
    repeat: {
      mileage: 10000,
      days: 365,
    },
    notify_at: {
      mileage: 40000,
      date: '2017-10-12T16:25:11+00:00',
    },
    done_at: {
      mileage: 30000,
      date: '2016-10-12T16:25:11+00:00',
    },
  },
  {
    id: 'mrn:reminder:0376b05a-05da-4286-b946-fa1e137cd42e',
    name: 'Rotacion de Cubiertas',
    icon: 'tire_rotation',
    type: 'mrn:reminder_type:tyre_rotation',
    repeat: {
      mileage: 10000,
      days: 365,
    },
    notify_at: {
      mileage: 40000,
      date: '2017-10-12T16:25:11+00:00',
    },
    done_at: {
      mileage: 30000,
      date: '2016-10-12T16:25:11+00:00',
    },
  },
];

const remindersHistoryMock = [
  {
    account_id: 'mrn:account:1eecdae4-08eb-47f0-abc1-21762511273f',
    created_by: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
    created_timestamp: 1538589359364,
    date: '2018-10-03T17:55:49.961Z',
    id: 'mrn:reminder_log:5dfe83d2-6f42-4542-9642-1006aafc2c2c',
    last_modified_by: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
    last_modified_timestamp: 1538589359364,
    mileage: 21000,
    notes: '',
    reminder_id: 'mrn:reminder:c1ca4db9-e79d-4704-a60c-e49c818780c6',
    reminder_type_id: 'mrn:reminder_type:tyre_rotation',
    thing_id: 'mrn:thing:vehicle:05672ff4-4524-4d6a-897e-3975f3030465',
  },
  {
    account_id: 'mrn:account:1eecdae4-08eb-47f0-abc1-21762511273f',
    created_by: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
    created_timestamp: 1538569881391,
    date: '2018-10-03T12:31:13.579Z',
    id: 'mrn:reminder_log:269085af-0222-42ef-8f97-1d1c6f584fbb',
    last_modified_by: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
    last_modified_timestamp: 1538569881391,
    mileage: 21000,
    notes: '',
    reminder_id: 'mrn:reminder:3caea17f-e1d7-4c8c-9544-8d382d33c108',
    reminder_type_id: 'mrn:reminder_type:oil_change',
    thing_id: 'mrn:thing:vehicle:05672ff4-4524-4d6a-897e-3975f3030465',
  },
];

const remindersHistoryMockProcessed = [
  {
    id: 'mrn:reminder_log:5dfe83d2-6f42-4542-9642-1006aafc2c2c',
    type: 'mrn:reminder_type:tyre_rotation',
    icon: 'tire_rotation',
    name: 'Rotacion de Cubiertas',
    date: '3/10/2018',
    mileage: '21.000 km',
  },
  {
    id: 'mrn:reminder_log:269085af-0222-42ef-8f97-1d1c6f584fbb',
    type: 'mrn:reminder_type:oil_change',
    icon: 'oil_change',
    name: 'Cambio de Aceite',
    date: '3/10/2018',
    mileage: '21.000 km',
  },
];


describe('reminders saga test', () => {
  it('should get reminders data', () => {
    const action = { thingId: 'thingId' };
    testSaga(getReminders, action)
      .next()
      .put({ type: REMINDERS_LOADING })
      .next()
      .call(remindersService.getTypes)
      .next(reminderTypesMock)
      .call(thingsService.getReminders, action.thingId)
      .next(remindersMock)
      .put({ type: REMINDERS_GET_HISTORY_ITEMS, thingId: action.thingId })
      .next()
      .take(REMINDERS_GET_HISTORY_ITEMS_SUCCESS)
      .next()
      .put({
        type: GET_REMINDERS_SUCCESSFUL,
        remindersData: processedRemindersMock,
        reminderTypesData: reminderTypesMock,
      })
      .next()
      .isDone();
  });

  it('should notify loading error', () => {
    const action = { thingId: 'thingId' };
    const error = 'error';
    try {
      testSaga(getReminders, action)
        .next()
        .put({ type: REMINDERS_LOADING })
        .next()
        .throw(error)
        .next()
        .put({ type: REMINDERS_LOADING_ERROR })
        .next()
        .isDone();
    } catch (err) {
      expect(err).toBe(error);
    }
  });


  it('should change reminder config', () => {
    const thingId = 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5';
    const reminderId = 'mrn:reminder:c064e4e4-9445-41cb-9000-3a25c8013088';
    const configurations = [{ value: 12342, type: 'mileage' }];
    const processedConfig = [{
      action: 'update',
      path: configurations[0].type,
      value: configurations[0].value,
    }];
    const action = {
      type: CHANGE_REMINDER_CONFIG,
      thingId,
      reminderId,
      configurations,
    };

    testSaga(changeReminderConfig, action)
      .next()
      .call(remindersService.updateReminder, thingId, reminderId, processedConfig)
      .next()
      .next() // Delay
      .put({ type: GET_REMINDERS, thingId })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha cambiado con exito tu la configuracion de tu recordatorio',
        },
      })
      .next()
      .isDone();
  });

  it('should add reminders', () => {
    const thingId = 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5';
    const reminderTypes = [
      'mrn:reminder_type:suspension_change',
      'mrn:reminder_type:tyre_rotation',
    ];
    const action = {
      type: ADD_REMINDERS,
      thingId,
      reminderTypes,
    };

    testSaga(addReminders, action)
      .next()
      .all([
        call(remindersService.add, thingId, { reminder_type_id: action.reminderTypes[0] }),
        call(remindersService.add, thingId, { reminder_type_id: action.reminderTypes[1] }),
      ])
      .next(reminderDoneMock)
      .put({ type: ADD_REMINDERS_SUCCESSFUL, remindersCreated: reminderDoneMockProcessed })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha agregado con exito tu recordatorio',
        },
      })
      .next()
      .isDone();
  });

  it('should mark reminder as done', () => {
    const thingId = 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5';
    const action = {
      type: MARK_SERVICE_DONE,
      thingId,
      reminders: remindersMock,
      doneAt: {
        mileage: 1231231,
        date: 1532535900850,
      },
    };

    const getHistoryParameters = {
      _sort: 'created_timestamp+desc',
      _limit: HISTORY_PAGE_SIZE,
      _page: 1,
    };

    const body = {
      mileage: action.doneAt.mileage,
      date: action.doneAt.date,
      notes: '',
    };

    testSaga(reminderDone, action)
      .next()
      .all([
        call(remindersService.register, thingId, action.reminders[0], body),
        call(remindersService.register, thingId, action.reminders[1], body),
      ])
      .next(reminderDoneMock)
      .next() // delay
      .call(remindersService.getHistory, thingId, getHistoryParameters)
      .next(remindersHistoryMock)
      .put({ type: GET_REMINDERS, thingId: action.thingId })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha marcado como hecho tus recordatorios',
        },
      })
      .next()
      .put({
        type: MARK_SERVICE_DONE_SUCCESS,
        servicesDone: [
          action.reminders[0].id,
          action.reminders[1].id,
        ],
        historyItems: remindersHistoryMockProcessed,
      })
      .next()
      .isDone();
  });

  it('should mark reminder as done (no mileage)', () => {
    const thingId = 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5';
    const action = {
      type: MARK_SERVICE_DONE,
      thingId,
      reminders: remindersMock,
      doneAt: {
        date: 1532535900850,
      },
    };

    const getHistoryParameters = {
      _sort: 'created_timestamp+desc',
      _limit: HISTORY_PAGE_SIZE,
      _page: 1,
    };

    const body = {
      mileage: 0,
      date: action.doneAt.date,
      notes: '',
    };

    testSaga(reminderDone, action)
      .next()
      .all([
        call(remindersService.register, thingId, action.reminders[0], body),
        call(remindersService.register, thingId, action.reminders[1], body),
      ])
      .next(reminderDoneMock)
      .next() // delay
      .call(remindersService.getHistory, thingId, getHistoryParameters)
      .next(remindersHistoryMock)
      .put({ type: GET_REMINDERS, thingId: action.thingId })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha marcado como hecho tus recordatorios',
        },
      })
      .next()
      .put({
        type: MARK_SERVICE_DONE_SUCCESS,
        servicesDone: [
          action.reminders[0].id,
          action.reminders[1].id,
        ],
        historyItems: remindersHistoryMockProcessed,
      })
      .next()
      .isDone();
  });

  it('should delete reminder', () => {
    const reminderId = 'mrn:reminder:c064e4e4-9445-41cb-9000-3a25c8013088';
    const thingId = 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5';
    const action = { type: DELETE_REMINDER, thingId, reminderId };

    testSaga(deleteReminder, action)
      .next()
      .call(remindersService.delete, thingId, reminderId)
      .next()
      .put({ type: DELETE_REMINDER_SUCCESS, reminderId })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'El recordatorio se ha borrado con exito',
        },
      })
      .next()
      .isDone();
  });

  it('should get history items', () => {
    const thingId = 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5';
    const page = 1;
    const getHistoryParameters = {
      _sort: 'created_timestamp+desc',
      _limit: 10,
      _page: page,
    };
    const action = { type: REMINDERS_GET_HISTORY_ITEMS, thingId };

    testSaga(getHistoryItems, action)
      .next()
      .select(getHistoryPage)
      .next(page)
      .call(remindersService.getHistory, action.thingId, getHistoryParameters)
      .next(remindersHistoryMock)
      .put({
        type: REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
        historyItems: remindersHistoryMockProcessed,
        pageSize: 10,
      })
      .next()
      .isDone();
  });
});

