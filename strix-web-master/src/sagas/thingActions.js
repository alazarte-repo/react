import { put, take, call, delay } from 'redux-saga/effects';
import { thingsService } from '../services';
import ThingActionState from '../constants/thingActionState';
import { waitForAction } from '../utils/things';
import { notifySuccess, notifyError } from '../actions/actionStatus';
import { executeActionSuccess, executeActionError } from '../actions/things';
import {
  REFRESH_THING,
  REFRESH_THING_SUCCESS,
} from '../constants';


/**
 * Generates a query string to check if the actions included in actions list
 * are running for a certain thing
 *
 * @param {Actions to check if are beign executed} actionList
 */
export function getRunningActionQuery(actionList) {
  const possibleActions = actionList.reduce((xs, x) => `action=='${x}' OR ${xs}`, '').slice(0, -4);
  return `state=='${ThingActionState.Running}' AND (${possibleActions})&_sort=created_timestamp%2Bdesc`;
}

/**
 * Returns a generator function that waits until an action execution ends, after that,
 * refresh the thing affected by the action.
 *
 * @param {Success message to display when action finishes, can be a function taking
 *  the finished action name as a parameter or a string}
 * successMessage: Function (action: strring) => string | string
 *
 * @param {Error message to display in a notification when action finishes, can be
 * a function taking the finished action name and the error thrown as a parameter or
 * a string}
 * errorMessage: Function (action: strring, error: object) => string | string
 *
 * @param {Function to process the error, the resulting string will be sent to the
 * reducer to be stored}
 * processError: Function (error: object) => string
 *
 * @param {To which category corresponds the action executed} category: string
 */
// eslint-disable-next-line max-len
export function waitExecutionToConcludeFactory(successMessage, errorMessage, processError, category) {
  return function* waitExecutionToConclude(thingId, actionExecution) {
    try {
      yield call(waitForAction, thingId, actionExecution);
      yield delay(5000);
      yield put({ type: REFRESH_THING, thingId });
      yield take(REFRESH_THING_SUCCESS);
      yield put(executeActionSuccess(category, thingId));
      yield put(notifySuccess(typeof successMessage === 'function'
        ? successMessage(actionExecution.action)
        : successMessage,
      ));
    } catch (error) {
      const processedError = processError != null && typeof processError === 'function'
        ? processError(error)
        : null;
      yield put(executeActionError(category, thingId, processedError));
      yield put(notifyError(typeof successMessage === 'function'
        ? errorMessage(actionExecution.action, error)
        : errorMessage,
      ));
    }
  };
}

/**
 * Returns a generator function that checks if there are running actions
 * in a thing
 *
 * @param {Query string for checking if an action is running} query
 * @param {Function in charge of wait an action to finish} waitFunction
 * @param {To which category corresponds the action executed} category
 */
export function pollRunningActionFactory(query, waitFunction, category) {
  return function* pollRunningAction({ thingId }) {
    const currentActions = yield call(thingsService.getActions, thingId, query);
    if (currentActions.length > 0) {
      yield* waitFunction(thingId, currentActions[0]);
    } else {
      yield put(executeActionSuccess(category, thingId));
    }
  };
}

/**
 * Returns a generator function that checks if there are running actions
 * in a thing, if there is none, executes an action for certain thing id
 * otherwise, waits until the current running action finishes and does nothing.
 *
 * @param {Query string for checking if an action is running} query
 * @param {Function in charge of wait an action to finish} waitFunction
 * @param {To which category corresponds the action executed} category
 */
export function executeActionFactory(query, waitFunction, category) {
  return function* executeAction({ thingId, action, body }) {
    try {
      const currentActions = yield call(thingsService.getActions, thingId, query);
      const actionExecution = currentActions.length === 0
        ? yield call(thingsService.executeAction, thingId, action, body)
        : currentActions[0];
      yield* waitFunction(thingId, actionExecution);
    } catch (error) {
      yield put(executeActionError(category, thingId));
      throw error;
    }
  };
}
