/* eslint-env jasmine */

import { fromJS } from 'immutable';
import remindersReducer from './reminders';
import {
  GET_REMINDERS_SUCCESSFUL,
  ADD_REMINDERS_SUCCESSFUL,
  MARK_SERVICE_DONE,
  MARK_SERVICE_DONE_SUCCESS,
  DELETE_REMINDER_SUCCESS,
  REMINDERS_LOADING,
  REMINDERS_LOADING_ERROR,
  REMINDERS_RESET,
  REMINDERS_GET_HISTORY_ITEMS,
  REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
} from '../constants';

const doneReminderId = 'mrn:reminder:c2ed5199-6650-4b76-a0c3-cfea51b790f2';
const remindersDataMock = [
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    active: true,
    country_id: 'AR',
    created_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    created_timestamp: 1530821505540,
    done_at: {
      date: '2018-07-05T00:00:00Z',
      mileage: 0,
    },
    id: 'mrn:reminder:c064e4e4-9445-41cb-9000-3a25c8013088',
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1535050167446,
    notes: 'Service Oficial',
    notifiable_at: false,
    notifiable_before: false,
    notified_at: 0,
    notified_before: 0,
    notify_at: {
      date: '2019-07-05T00:00:00Z',
      mileage: 15000,
    },
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    reminder_type_id: 'mrn:reminder_type:official_service',
    repeat: {
      days: 365,
      mileage: 15000,
    },
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
  },
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    active: true,
    country_id: 'AR',
    created_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    created_timestamp: 1530792193326,
    done_at: {
      date: '2018-07-05T00:00:00Z',
      mileage: 0,
    },
    id: doneReminderId,
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1535050204900,
    notifiable_at: false,
    notifiable_before: false,
    notified_at: 0,
    notified_before: 0,
    notify_at: {
      date: '2023-07-04T00:00:00Z',
      mileage: 100000,
    },
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    reminder_type_id: 'mrn:reminder_type:drivers_license_renewal',
    repeat: {
      days: 1825,
      mileage: 100000,
    },
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
  },
];

const newRemindersMock = [
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    active: true,
    country_id: 'AR',
    created_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    created_timestamp: 1535110867755,
    done_at: {
      date: '2018-08-24T00:00:00Z',
      mileage: 0,
    },
    id: 'mrn:reminder:cb44eb73-d7ca-4db1-b5d6-5d918464b357',
    last_modified_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    last_modified_timestamp: 1535110867755,
    notifiable_at: false,
    notifiable_before: false,
    notified_at: 0,
    notified_before: 0,
    notify_at: {
      date: '2019-08-24T00:00:00Z',
      mileage: 100000,
    },
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    reminder_type_id: 'mrn:reminder_type:technical_verification',
    repeat: {
      days: 365,
      mileage: 100000,
    },
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
  },
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    active: true,
    country_id: 'AR',
    created_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    created_timestamp: 1535110867981,
    done_at: {
      date: '2018-08-24T00:00:00Z',
      mileage: 0,
    },
    id: 'mrn:reminder:817752e1-b389-4cd7-b72b-0f3b9343a925',
    last_modified_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    last_modified_timestamp: 1535110867981,
    notifiable_at: false,
    notifiable_before: false,
    notified_at: 0,
    notified_before: 0,
    notify_at: {
      date: '2019-08-24T00:00:00Z',
      mileage: 10000,
    },
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    reminder_type_id: 'mrn:reminder_type:oil_change',
    repeat: {
      days: 365,
      mileage: 10000,
    },
    thing_id: 'mrn:thing:vehicle:ce829baf-b471-412b-9e59-be25576c13e5',
  },
];


const remindersTypesMock = [
  {
    created_by: '5ujgdce8phmvzehsb2p7kerbhzbbd8gq',
    created_timestamp: 1522961561358,
    description: 'Renovar Licencia de Conducir',
    id: 'mrn:reminder_type:drivers_license_renewal',
    last_modified_by: '5ujgdce8phmvzehsb2p7kerbhzbbd8gq',
    last_modified_timestamp: 1522961561358,
    name: 'Renovar Licencia de Conducir',
    notify_before: {
      days: 30,
      mileage: 1000,
    },
    repeat: {
      days: 1825,
      mileage: 100000,
    },
    thing_type: 'mrn:things:vehicle',
  },
  {
    created_by: '5ujgdce8phmvzehsb2p7kerbhzbbd8gq',
    created_timestamp: 1522961650341,
    description: 'Avisa cuando se debe realizar un Cambio de aceite al motor del auto',
    id: 'mrn:reminder_type:oil_change',
    last_modified_by: '5ujgdce8phmvzehsb2p7kerbhzbbd8gq',
    last_modified_timestamp: 1522961650341,
    name: 'Cambio de Aceite y Filtros',
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

describe('reminders reducer', () => {
  let state;

  beforeEach(() => {
    state = remindersReducer(undefined, {});
  });


  it('should initialize', () => {
    const expectedState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      registerWorking: false,
      history: [],
      historyPage: 1,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(undefined, {});

    expect(newState).toEqual(expectedState);
  });

  it('should save reminders data and types', () => {
    const action = {
      type: GET_REMINDERS_SUCCESSFUL,
      remindersData: remindersDataMock,
      reminderTypesData: remindersTypesMock,
    };

    const newState = remindersReducer(state, action);
    const expectedState = fromJS({
      firstLoad: false,
      loading: false,
      list: remindersDataMock,
      types: remindersTypesMock,
      registerWorking: false,
      history: [],
      historyPage: 1,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });

  it('should add reminders', () => {
    const action = {
      type: ADD_REMINDERS_SUCCESSFUL,
      remindersCreated: newRemindersMock,
    };
    const actualState = fromJS({
      list: remindersDataMock,
      types: remindersTypesMock,
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      list: remindersDataMock.concat(newRemindersMock),
      types: remindersTypesMock,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should delete a reminder', () => {
    const action = {
      type: DELETE_REMINDER_SUCCESS,
      reminderId: remindersDataMock[0].id,
    };
    const actualState = fromJS({
      list: remindersDataMock,
      types: remindersTypesMock,
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      list: remindersDataMock.filter(x => x.id !== remindersDataMock[0].id),
      types: remindersTypesMock,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should mark a reminder as done', () => {
    const remindersHistoryMock = ['h1', 'h2', 'h3', 'h4', 'h5'];
    const newRemindersHistoryMock = ['n1', 'n2', 'n3'];
    const servicesDone = [
      'mrn:reminder:c2ed5199-6650-4b76-a0c3-cfea51b790f2',
      'mrn:reminder:c064e4e4-9445-41cb-9000-3a25c8013088',
    ];
    const recentlyDone = new Set();
    const action = {
      type: MARK_SERVICE_DONE_SUCCESS,
      servicesDone,
      historyItems: newRemindersHistoryMock,
    };
    const actualState = fromJS({
      list: remindersDataMock,
      types: remindersTypesMock,
      registerWorking: true,
      recentlyDone,
      history: remindersHistoryMock,
      page: 23,
    });

    const newState = remindersReducer(actualState, action);
    servicesDone.forEach(x => recentlyDone.add(x));
    const expectedState = fromJS({
      list: remindersDataMock,
      types: remindersTypesMock,
      registerWorking: false,
      recentlyDone,
      history: newRemindersHistoryMock,
      page: 1,
    });

    expect(newState).toEqual(expectedState);
  });


  it('should set registerWorking flag true when mark service done', () => {
    const action = { type: MARK_SERVICE_DONE };
    const actualState = fromJS({
      registerWorking: false,
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({ registerWorking: true });

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = remindersReducer(state, action);

    expect(newState).toBe(state);
  });

  it('should set loading state only if it is the first load', () => {
    const action = { type: REMINDERS_LOADING };
    const actualState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: true,
      loading: true,
      list: [],
      types: [],
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });

  it('should NOT set loading because is not the first load', () => {
    const action = { type: REMINDERS_LOADING };
    const actualState = fromJS({
      firstLoad: false,
      loading: false,
      list: [],
      types: [],
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);

    expect(newState).toEqual(actualState);
  });

  it('should NOT set loading because is not the first load', () => {
    const action = { type: REMINDERS_LOADING };
    const actualState = fromJS({
      firstLoad: false,
      loading: false,
      list: [],
      types: [],
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);

    expect(newState).toEqual(actualState);
  });

  it('should unset loading', () => {
    const action = { type: REMINDERS_LOADING_ERROR };
    const actualState = fromJS({
      firstLoad: false,
      loading: true,
      list: [],
      types: [],
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: false,
      loading: false,
      list: [],
      types: [],
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });

  it('should reset reminders', () => {
    const action = { type: REMINDERS_RESET };
    const actualState = fromJS({
      firstLoad: false,
      loading: true,
      list: [1, 2, 3, 4],
      types: [1, 2, 3, 4, 5],
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: [],
      registerWorking: false,
      historyPage: 1,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });


  it('should NOT set loading if its the first history page', () => {
    const action = { type: REMINDERS_GET_HISTORY_ITEMS };
    const actualState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: [],
      historyPage: 1,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);

    expect(newState).toEqual(actualState);
  });

  it('should set loading if it is NOT the first history page', () => {
    const action = { type: REMINDERS_GET_HISTORY_ITEMS };
    const actualState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: [],
      historyPage: 4,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: [],
      historyPage: 4,
      historyLoading: true,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });

  it('should add received history items', () => {
    const remindersHistoryMock = ['h1', 'h2', 'h3', 'h4', 'h5'];
    const action = {
      type: REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
      historyItems: remindersHistoryMock,
      pageSize: 5,
    };
    const actualState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: [],
      historyPage: 2,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: remindersHistoryMock,
      historyPage: 3,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });

  it('should set historyNoMorePages flag we receive less items than pageSize', () => {
    const remindersHistoryMock = ['h1', 'h2', 'h3', 'h4'];
    const action = {
      type: REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
      historyItems: remindersHistoryMock,
      pageSize: 5,
    };
    const actualState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: [],
      historyPage: 2,
      historyLoading: false,
      historyNoMorePages: false,
      recentlyDone: new Set(),
    });

    const newState = remindersReducer(actualState, action);
    const expectedState = fromJS({
      firstLoad: true,
      loading: false,
      list: [],
      types: [],
      history: remindersHistoryMock,
      historyPage: 3,
      historyLoading: false,
      historyNoMorePages: true,
      recentlyDone: new Set(),
    });

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = remindersReducer(state, action);

    expect(newState).toBe(state);
  });
});
