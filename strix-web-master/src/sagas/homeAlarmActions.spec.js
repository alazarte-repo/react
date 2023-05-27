/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { thingsService } from '../services';
import { pollRunningAction, executeAction } from './homeAlarmActions';
import ThingActionState from '../constants/thingActionState';
import { waitForAction } from '../utils/things';
import AlarmActions from '../constants/alarmActions';
import { notifySuccess, notifyError } from '../actions/actionStatus';
import { actionCategories } from '../reducers/thingsActions';
import {
  ALARM_CHECK_RUNNING_ACTION,
  ALARM_EXECUTE_ACTION,
  REFRESH_THING,
  REFRESH_THING_SUCCESS,
  EXECUTE_ACTION_SUCCESS,
  EXECUTE_ACTION_ERROR,
} from '../constants';

const THING_ID = 'mrn:thing:home:9b7d5d0d-9c1b-4388-9e4d-5a44f5f4a454';

const homeAlarmArmActionResponseRunning = {
  account_id: 'mrn:account:56d51357-f04f-49b0-afb3-3f493b732170',
  action: 'arm',
  automated: false,
  created_by: 'mrn:user:ad68254e-27c9-4407-8185-14e118fd8147',
  created_timestamp: 1563555954536,
  id: 'mrn:action_execution:30c6c69e-bd74-458d-bdf2-d029f22011e3',
  lang: 'es_AR',
  last_modified_by: 'mrn:user:ad68254e-27c9-4407-8185-14e118fd8147',
  last_modified_timestamp: 1563555954570,
  parameters: {
    code: '1234',
    zones: [],
  },
  result: {},
  state: 'running',
  thing_id: 'mrn:thing:home:9b7d5d0d-9c1b-4388-9e4d-5a44f5f4a454',
  thing_type: 'mrn:things:home',
};

const homeAlarmDisarmActionResponseRunning = {
  account_id: 'mrn:account:56d51357-f04f-49b0-afb3-3f493b732170',
  action: 'disarm',
  automated: false,
  created_by: 'mrn:user:ad68254e-27c9-4407-8185-14e118fd8147',
  created_timestamp: 1563557167626,
  id: 'mrn:action_execution:626ae236-150a-4881-b42c-42cb2a873689',
  lang: 'es_AR',
  last_modified_by: 'mrn:user:ad68254e-27c9-4407-8185-14e118fd8147',
  last_modified_timestamp: 1563557167661,
  parameters: {
    code: '1234',
    zones: [],
  },
  result: {},
  state: 'running',
  thing_id: 'mrn:thing:home:9b7d5d0d-9c1b-4388-9e4d-5a44f5f4a454',
  thing_type: 'mrn:things:home',
};

const homerAlarmArmActionErrorTwoZones = {
  account_id: 'mrn:account:56d51357-f04f-49b0-afb3-3f493b732170',
  action: 'arm',
  automated: false,
  created_by: 'mrn:user:ad68254e-27c9-4407-8185-14e118fd8147',
  created_timestamp: 1563557532846,
  id: 'mrn:action_execution:183ab986-972d-401a-8382-ab73e22e5376',
  lang: 'es_AR',
  last_modified_by: 'magenta_internal',
  last_modified_timestamp: 1563557534776,
  parameters: {
    code: '1234',
    zones: [],
  },
  result: {
    error: 'open_zones',
    zones: [
      'closed',
      'closed',
      'closed',
      'opened',
      'opened',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
    ],
  },
  state: 'error',
  thing_id: 'mrn:thing:home:9b7d5d0d-9c1b-4388-9e4d-5a44f5f4a454',
  thing_type: 'mrn:things:home',
};

const homerAlarmArmActionErrorOneZone = {
  account_id: 'mrn:account:56d51357-f04f-49b0-afb3-3f493b732170',
  action: 'arm',
  automated: false,
  created_by: 'mrn:user:ad68254e-27c9-4407-8185-14e118fd8147',
  created_timestamp: 1563557532846,
  id: 'mrn:action_execution:183ab986-972d-401a-8382-ab73e22e5376',
  lang: 'es_AR',
  last_modified_by: 'magenta_internal',
  last_modified_timestamp: 1563557534776,
  parameters: {
    code: '1234',
    zones: [],
  },
  result: {
    error: 'open_zones',
    zones: [
      'closed',
      'closed',
      'closed',
      'opened',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
      'closed',
    ],
  },
  state: 'error',
  thing_id: 'mrn:thing:home:9b7d5d0d-9c1b-4388-9e4d-5a44f5f4a454',
  thing_type: 'mrn:things:home',
};

const errorExecution = {
  result: { details: 'Invalid code.' },
};

const query = `state=='${ThingActionState.Running}' AND (action=='${AlarmActions.Disarm}' OR action=='${AlarmActions.Arm}')&_sort=created_timestamp%2Bdesc`;

describe('homeAlarmActions saga test', () => {
  it('should check running action: wait action to end and notify alarm armed successfuly', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homeAlarmArmActionResponseRunning])
      .call(waitForAction, action.thingId, homeAlarmArmActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
      })
      .next()
      .put(notifySuccess('La alarma se ha armado con éxito.'))
      .next()
      .isDone();
  });

  it('should check running action: wait to action to end and notify error arming alarm', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homeAlarmArmActionResponseRunning])
      .call(waitForAction, action.thingId, homeAlarmArmActionResponseRunning)
      .throw(errorExecution)
      .put({
        type: EXECUTE_ACTION_ERROR,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
        error: 'No se ha podido enviar el comando. Revise el código ingresado e intente nuevamente.',
      })
      .next()
      .put(notifyError(
        `Ha ocurrido un error al armar la alarma. ${errorExecution.result.details}`,
      ))
      .next()
      .isDone();
  });

  it('should check running action: should notify about open zones (two) error arming alarm', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homerAlarmArmActionErrorTwoZones])
      .call(waitForAction, action.thingId, homerAlarmArmActionErrorTwoZones)
      .throw(homerAlarmArmActionErrorTwoZones)
      .put({
        type: EXECUTE_ACTION_ERROR,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
        error: 'La alarma no se pudo armar porque las zonas 4, 5 están abiertas.',
      })
      .next()
      .put(notifyError(
        'Ha ocurrido un error al armar la alarma. ',
      ))
      .next()
      .isDone();
  });

  it('should check running action: should notify about open zones (one) error arming alarm', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homerAlarmArmActionErrorOneZone])
      .call(waitForAction, action.thingId, homerAlarmArmActionErrorOneZone)
      .throw(homerAlarmArmActionErrorOneZone)
      .put({
        type: EXECUTE_ACTION_ERROR,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
        error: 'La alarma no se pudo armar porque la zona 4 está abierta.',
      })
      .next()
      .put(notifyError(
        'Ha ocurrido un error al armar la alarma. ',
      ))
      .next()
      .isDone();
  });

  it('should check running action: wait to action to end and notify alarm armed successfuly', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homeAlarmDisarmActionResponseRunning])
      .call(waitForAction, action.thingId, homeAlarmDisarmActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
      })
      .next()
      .put(notifySuccess('La alarma se ha desarmado con éxito.'))
      .next()
      .isDone();
  });

  it('should check running action: wait to action to end and notify error arming alarm', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homeAlarmDisarmActionResponseRunning])
      .call(waitForAction, action.thingId, homeAlarmDisarmActionResponseRunning)
      .throw(errorExecution)
      .put({
        type: EXECUTE_ACTION_ERROR,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
        error: 'No se ha podido enviar el comando. Revise el código ingresado e intente nuevamente.',
      })
      .next()
      .put(notifyError(
        `Ha ocurrido un error al desarmar la alarma. ${errorExecution.result.details}`,
      ))
      .next()
      .isDone();
  });

  it('should check running action: should succeed if there are no pending actions', () => {
    const action = { type: ALARM_CHECK_RUNNING_ACTION, thingId: THING_ID };

    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([])
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
      })
      .next()
      .isDone();
  });

  it('should execute action: must execute disarm action if there are no pending actions', () => {
    const action = {
      type: ALARM_EXECUTE_ACTION,
      thingId: THING_ID,
      action: AlarmActions.Disarm,
      body: { code: '1234' },
    };
    testSaga(executeAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([])
      .call(thingsService.executeAction, action.thingId, action.action, action.body)
      .next(homeAlarmDisarmActionResponseRunning)
      .call(waitForAction, action.thingId, homeAlarmDisarmActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
      })
      .next()
      .put(notifySuccess('La alarma se ha desarmado con éxito.'))
      .next()
      .isDone();
  });

  it('should execute action: must execute arm action if there are no pending actions', () => {
    const action = {
      type: ALARM_EXECUTE_ACTION,
      thingId: THING_ID,
      action: AlarmActions.Disarm,
      body: { code: '1234' },
    };
    testSaga(executeAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([])
      .call(thingsService.executeAction, action.thingId, action.action, action.body)
      .next(homeAlarmArmActionResponseRunning)
      .call(waitForAction, action.thingId, homeAlarmArmActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
      })
      .next()
      .put(notifySuccess('La alarma se ha armado con éxito.'))
      .next()
      .isDone();
  });

  it('should execute action: should wait for pending action instead of executing a new one', () => {
    const action = {
      type: ALARM_EXECUTE_ACTION,
      thingId: THING_ID,
      action: AlarmActions.Disarm,
      body: { code: '1234' },
    };
    testSaga(executeAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([homeAlarmArmActionResponseRunning])
      .call(waitForAction, action.thingId, homeAlarmArmActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.HomeAlarm,
      })
      .next()
      .put(notifySuccess('La alarma se ha armado con éxito.'))
      .next()
      .isDone();
  });
});

