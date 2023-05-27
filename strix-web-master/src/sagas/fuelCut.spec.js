/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { thingsService } from '../services';
import { pollRunningAction, executeAction } from './fuelCut';
import ThingActionState from '../constants/thingActionState';
import { waitForAction } from '../utils/things';
import VehicleAction from '../constants/vehicleAction';
import { notifySuccess, notifyError } from '../actions/actionStatus';
import { actionCategories } from '../reducers/thingsActions';
import {
  FUEL_CUT_CHECK_RUNNING_ACTION,
  FUEL_CUT_EXECUTE_ACTION,
  REFRESH_THING,
  REFRESH_THING_SUCCESS,
  EXECUTE_ACTION_SUCCESS,
  EXECUTE_ACTION_ERROR,
} from '../constants';

const THING_ID = 'mrn:thing:vehicle:aa069e1f-c6ec-4b30-bd53-5dde1e549098';

const fuelRestoreActionResponseRunning = {
  account_id: 'mrn:account:ce6bfcbd-a0dc-41e8-8cd8-a3142cd4725b',
  action: 'fuel_restore',
  automated: false,
  created_by: 'mrn:user:e453c107-c91d-4854-af5e-ad96adbb36f0',
  created_timestamp: 1551893376948,
  id: 'mrn:action_execution:2b8aa5ec-dad8-44b7-8006-5657775d81e3',
  lang: 'es_AR',
  last_modified_by: 'mrn:user:e453c107-c91d-4854-af5e-ad96adbb36f0',
  last_modified_timestamp: 1551893377007,
  parameters: {},
  result: {},
  state: 'running',
  thing_id: 'mrn:thing:vehicle:aa069e1f-c6ec-4b30-bd53-5dde1e549098',
  thing_type: 'mrn:things:vehicle',
};

const fuelCutActionResponseRunning = {
  account_id: 'mrn:account:ce6bfcbd-a0dc-41e8-8cd8-a3142cd4725b',
  action: 'fuel_cut_off',
  automated: false,
  created_by: 'mrn:user:e453c107-c91d-4854-af5e-ad96adbb36f0',
  created_timestamp: 1551893376948,
  id: 'mrn:action_execution:2b8aa5ec-dad8-44b7-8006-5657775d81e3',
  lang: 'es_AR',
  last_modified_by: 'mrn:user:e453c107-c91d-4854-af5e-ad96adbb36f0',
  last_modified_timestamp: 1551893377007,
  parameters: {},
  result: {},
  state: 'running',
  thing_id: 'mrn:thing:vehicle:aa069e1f-c6ec-4b30-bd53-5dde1e549098',
  thing_type: 'mrn:things:vehicle',
};

const errorExecution = {
  result: { details: 'Invalid code.' },
};

const query = `state=='${ThingActionState.Running}' AND (action=='${VehicleAction.FuelCutOff}' OR action=='${VehicleAction.FuelRestore}')&_sort=created_timestamp%2Bdesc`;

describe('fuelCut saga test', () => {
  it('should check running action: wait action to end and notify fuel restored successfuly', () => {
    const action = { type: FUEL_CUT_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([fuelRestoreActionResponseRunning])
      .call(waitForAction, action.thingId, fuelRestoreActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
      })
      .next()
      .put(notifySuccess('El combustible se ha restaurado con éxito.'))
      .next()
      .isDone();
  });

  it('should check running action: wait to action to end and notify error restoring fuel', () => {
    const action = { type: FUEL_CUT_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([fuelRestoreActionResponseRunning])
      .call(waitForAction, action.thingId, fuelRestoreActionResponseRunning)
      .throw(errorExecution)
      .put({
        type: EXECUTE_ACTION_ERROR,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
        error: null,
      })
      .next()
      .put(notifyError(
        `Ha ocurrido un error al restaurar el combustible:\n ${errorExecution.result.details}`,
      ))
      .next()
      .isDone();
  });

  it('should check running action: wait to action to end and notify fuel restored successfuly', () => {
    const action = { type: FUEL_CUT_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([fuelCutActionResponseRunning])
      .call(waitForAction, action.thingId, fuelCutActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
      })
      .next()
      .put(notifySuccess('El combustible se ha cortado con éxito.'))
      .next()
      .isDone();
  });

  it('should check running action: wait to action to end and notify error restoring fuel', () => {
    const action = { type: FUEL_CUT_CHECK_RUNNING_ACTION, thingId: THING_ID };
    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([fuelCutActionResponseRunning])
      .call(waitForAction, action.thingId, fuelCutActionResponseRunning)
      .throw(errorExecution)
      .put({
        type: EXECUTE_ACTION_ERROR,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
        error: null,
      })
      .next()
      .put(notifyError(
        `Ha ocurrido un error al cortar el combustible:\n ${errorExecution.result.details}`,
      ))
      .next()
      .isDone();
  });

  it('should check running action: should succeed if there are no pending actions', () => {
    const action = { type: FUEL_CUT_CHECK_RUNNING_ACTION, thingId: THING_ID };

    testSaga(pollRunningAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([])
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
      })
      .next()
      .isDone();
  });

  it('should execute action: must execute cut off action if there are no pending actions', () => {
    const action = {
      type: FUEL_CUT_EXECUTE_ACTION,
      thingId: THING_ID,
      action: VehicleAction.FuelCutOff,
      body: { code: '1234' },
    };
    testSaga(executeAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([])
      .call(thingsService.executeAction, action.thingId, action.action, action.body)
      .next(fuelCutActionResponseRunning)
      .call(waitForAction, action.thingId, fuelCutActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
      })
      .next()
      .put(notifySuccess('El combustible se ha cortado con éxito.'))
      .next()
      .isDone();
  });

  it('should execute action: must execute restore action if there are no pending actions', () => {
    const action = {
      type: FUEL_CUT_EXECUTE_ACTION,
      thingId: THING_ID,
      action: VehicleAction.FuelCutOff,
      body: { code: '1234' },
    };
    testSaga(executeAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([])
      .call(thingsService.executeAction, action.thingId, action.action, action.body)
      .next(fuelRestoreActionResponseRunning)
      .call(waitForAction, action.thingId, fuelRestoreActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
      })
      .next()
      .put(notifySuccess('El combustible se ha restaurado con éxito.'))
      .next()
      .isDone();
  });

  it('should execute action: should wait for pending action insted of executing a new one', () => {
    const action = {
      type: FUEL_CUT_EXECUTE_ACTION,
      thingId: THING_ID,
      action: VehicleAction.FuelCutOff,
      body: { code: '1234' },
    };
    testSaga(executeAction, action)
      .next()
      .call(thingsService.getActions, action.thingId, query)
      .next([fuelRestoreActionResponseRunning])
      .call(waitForAction, action.thingId, fuelRestoreActionResponseRunning)
      .next()
      .next() // delay
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .take(REFRESH_THING_SUCCESS)
      .next()
      .put({
        type: EXECUTE_ACTION_SUCCESS,
        thingId: action.thingId,
        category: actionCategories.FuelCut,
      })
      .next()
      .put(notifySuccess('El combustible se ha restaurado con éxito.'))
      .next()
      .isDone();
  });
});

