import { put, all, takeEvery, call, delay } from 'redux-saga/effects';
import { thingsService } from '../services';
import { getThingRepresentation, waitForAction } from '../utils/things';
import ThingAction from '../constants/thingAction';
import { handleHttpErrors } from './handleErrors';
import {
  UPDATE_HOME_CONTROL_THINGS,
  UPDATE_HOME_CONTROL_THINGS_SUCCESS,
  HOME_CONTROL_SWITCH,
  HOME_CONTROL_SWITCH_SUCCESS,
  HOME_CONTROL_SWITCH_ERROR,
  START_BACKGROUND_SYNC,
  STOP_BACKGROUND_SYNC,
} from '../constants';

export function* updateHomeControlThings({ things }) {
  const _homeControls = {};
  for (let i = 0; i < things.length; i += 1) {
    const homeControlthings = yield call(thingsService.getThingsFromIds, things[i].thingIds, { _include: 'external_state' });
    if (homeControlthings != null && homeControlthings.length !== 0) {
      _homeControls[[things[i].parent_id]] = homeControlthings.map(getThingRepresentation);
    }
  }

  yield put({
    type: UPDATE_HOME_CONTROL_THINGS_SUCCESS,
    homeControls: _homeControls,
  });
}

export function* homeControlSwitch({ thingId, parentId, value }) {
  try {
    const action = value ? ThingAction.SwitchOn : ThingAction.SwitchOff;
    yield put({ type: STOP_BACKGROUND_SYNC });
    const actionExecution = yield call(thingsService.executeAction, thingId, action, {});
    yield call(waitForAction, thingId, actionExecution);
    yield delay(500);
    const newState = yield call(thingsService.get, thingId, { _include: 'external_state' });
    yield put({
      type: HOME_CONTROL_SWITCH_SUCCESS,
      thingId,
      parentId,
      updatedThing: getThingRepresentation(newState),
    });
    yield put({ type: START_BACKGROUND_SYNC });
  } catch (error) {
    yield put({
      type: HOME_CONTROL_SWITCH_ERROR,
      thingId,
      parentId,
    });
    yield put({ type: START_BACKGROUND_SYNC });
    throw (error);
  }
}

export default function* rootHomeControlSaga() {
  yield all([
    takeEvery(HOME_CONTROL_SWITCH, handleHttpErrors(homeControlSwitch, 'Ha ocurrido un error al apagar/prender.')),
    takeEvery(UPDATE_HOME_CONTROL_THINGS, handleHttpErrors(updateHomeControlThings, 'Ha ocurrido un error al ejecutar la acción')),
  ]);
}
