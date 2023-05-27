import { put, all, takeEvery, call, takeLatest, take } from 'redux-saga/effects';
import _ from 'lodash';
import { thingsService } from '../services';
import { setProductsUserProperties } from '../sagas/analytics';
import googleApiService from '../services/geocode';
import { handleHttpErrors } from './handleErrors';
import serializeThing from '../serializers/things';
import { sortCardsFunction } from '../utils/things';
import CardType from '../constants/cardType';

import {
  UPDATE_THINGS,
  UPDATE_THINGS_SUCCESSFUL,
  REFRESH_THING,
  REFRESH_THING_SUCCESS,
  UPDATE_THING_CONFIG,
  SUCCESS,
  UPDATE_HOME_CONTROL_THINGS,
} from '../constants';

function checkThing(thing) {
  const { type, state } = thing;

  if (type.includes('flex') || type.includes('vehicle')) {
    return state.location !== undefined;
  }
  return true;
}

export function* getThings() {
  let thingsNewData = yield thingsService.getThings();
  thingsNewData = thingsNewData.filter(thing => checkThing(thing));
  setProductsUserProperties(thingsNewData);

  const mappedThings = thingsNewData.map(serializeThing);
  for (let i = 0; i < mappedThings.length; i += 1) {
    const locationResponse = yield googleApiService.getLocation(mappedThings[i].center);
    const addressResponse = locationResponse.results.length > 0 ? locationResponse.results[0].formatted_address : 'Desconocida';
    mappedThings[i].location = addressResponse.slice(0, addressResponse.indexOf(','));
  }

  yield put({
    type: UPDATE_HOME_CONTROL_THINGS,
    things: mappedThings.filter(x => x.type === CardType.Home)
      .map(x => ({ parent_id: x.id, thingIds: x.homeControls })),
  });

  const sortedThings = _.sortBy(mappedThings, [sortCardsFunction, 'createdTimestamp']);
  yield put({
    type: UPDATE_THINGS_SUCCESSFUL,
    mappedThings: sortedThings,
  });
}

export function* refreshThing({ thingId }) {
  const thing = yield call(thingsService.get, thingId);
  const mappedThing = serializeThing(thing);
  if (mappedThing.type === CardType.Vehicle) {
    mappedThing.trips = yield call(thingsService.getTrips, mappedThing.id);
  }
  const locationResponse = yield call([googleApiService, 'getLocation'], mappedThing.center);
  const addressResponse = locationResponse.results[0].formatted_address;
  mappedThing.location = addressResponse.slice(0, addressResponse.indexOf(','));

  yield put({ type: REFRESH_THING_SUCCESS, mappedThing });
}

function* updateThingConfig({ body, thingId }) {
  yield call(thingsService.thingConfig, thingId, body);
  yield put({ type: REFRESH_THING, thingId });
  yield take(REFRESH_THING_SUCCESS);
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Tu configuracion ha sido guardada con exito',
    },
  });
}

export default function* rootThingsSaga() {
  yield all([
    takeEvery(UPDATE_THINGS, handleHttpErrors(getThings, 'Ha ocurrido un error obtener tus things')),
    takeEvery(REFRESH_THING, handleHttpErrors(refreshThing, 'Ha ocurrido un error al actualizar tu Thing')),
    takeLatest(UPDATE_THING_CONFIG, handleHttpErrors(updateThingConfig, 'Ha ocurrido un error al actualizar tu configuracion')),
  ]);
}
