/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import tasksReducer from './tasks';
import {
  GET_ALARMS_SUCCESS,
  CREATE_ALARM_SUCCESS,
  DELETE_ALARM_SUCCESS,
  EDIT_ALARM_SUCCESS,
} from '../constants';

const alarmsMock = [
  {
    account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
    action: 'arm',
    created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    created_timestamp: 1530725786187,
    cron: {
      day: '*',
      dow: [
        'tuesday',
        'thursday',
      ],
      hour: '22',
      minutes: '4',
      month: '*',
    },
    id: 'mrn:things_action_task:903a0f81-b219-4c6f-a5da-3fc1041fa1bc',
    last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    last_modified_timestamp: 1530729821572,
    properties: {
      code: '1234',
      zones: [],
    },
    retries: 3,
    thing_id: 'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e',
  },
  {
    account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
    action: 'arm',
    created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    created_timestamp: 1532971500554,
    cron: {
      day: '*',
      dow: [
        'thursday',
        'saturday',
      ],
      hour: '12',
      minutes: '0',
      month: '*',
    },
    id: 'mrn:things_action_task:648ae0c4-8aec-479a-b703-818775293c1f',
    last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    last_modified_timestamp: 1532971500554,
    properties: {
      code: '1234',
      zones: [],
    },
    retries: 3,
    thing_id: 'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e',
  },
];

const newAlarm = {
  account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
  action: 'arm',
  created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  created_timestamp: 1532971526387,
  cron: {
    day: '*',
    dow: [
      'sunday',
      'monday',
    ],
    hour: '22',
    minutes: '42',
    month: '*',
  },
  id: 'mrn:things_action_task:a14503bc-4058-438b-9186-e025b4a6479c',
  last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  last_modified_timestamp: 1532971526387,
  properties: {
    code: '1234',
    zones: [],
  },
  retries: 3,
  thing_id: 'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e',
};

describe('tasks reducer', () => {
  let state;

  beforeEach(() => {
    state = tasksReducer(undefined, {});
  });


  it('should initialize', () => {
    const expectedState = fromJS({
      list: [],
    });

    const newState = tasksReducer(undefined, {});

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should save alarms', () => {
    const action = {
      type: GET_ALARMS_SUCCESS,
      list: alarmsMock,
    };

    const newState = tasksReducer(state, action);
    const expectedState = fromJS({
      list: alarmsMock,
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should add new alarm', () => {
    const action = {
      type: CREATE_ALARM_SUCCESS,
      alarm: newAlarm,
    };
    const actualState = fromJS({
      list: alarmsMock,
    });

    const newState = tasksReducer(actualState, action);
    const expectedState = fromJS({
      list: alarmsMock.concat([newAlarm]),
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should delete new alarm', () => {
    const alarmId = 'mrn:things_action_task:903a0f81-b219-4c6f-a5da-3fc1041fa1bc';
    const action = {
      type: DELETE_ALARM_SUCCESS,
      id: alarmId,
    };
    const actualState = fromJS({
      list: alarmsMock,
    });

    const newState = tasksReducer(actualState, action);
    const expectedState = fromJS({
      list: alarmsMock.filter(x => x.id !== alarmId),
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should edit alarm', () => {
    const editedAlarm = Object.create(alarmsMock[0]);
    editedAlarm.cron.dow = ['monday', 'friday'];

    const action = {
      type: EDIT_ALARM_SUCCESS,
      alarm: editedAlarm,
    };
    const actualState = fromJS({
      list: alarmsMock,
    });

    const newState = tasksReducer(actualState, action);
    const newAlarmsMock = alarmsMock.slice(0);
    newAlarmsMock[0] = editedAlarm;
    const expectedState = fromJS({
      list: newAlarmsMock,
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = tasksReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});

