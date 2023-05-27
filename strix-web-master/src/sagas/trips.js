import _ from 'lodash';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { thingsService } from '../services';
import { TripsSagaUtils, getPolylinePath } from '../utils/TripsSagaUtils';
import DateTimeUtils from '../utils/DateTimeUtils';
import { handleHttpErrors } from './handleErrors';

import {
  UPDATE_TRIPS_SUCCESSFUL,
  SELECT_TRIP_DETAILS,
  UPDATE_TRIP_DETAILS_SUCCESSFUL,
  GET_TRIP_LIST,
  LEFT_PANEL_SET_LOADING,
  LEFT_PANEL_UNSET_LOADING,
} from '../constants';

export function* getTrips({ thingId, page }) {
  try {
    const tripsPayload = yield call(thingsService.getTrips, thingId, page);
    yield put({ type: LEFT_PANEL_SET_LOADING, message: 'Cargando viajes...' });
    const msBetweenRequests = 250;
    const trips = yield all(
      tripsPayload.map(
        async trip =>
          (trip.in_progress
            ? Object.assign(trip, {
              start: Object.assign(trip.start, {
                parsedAddress: await TripsSagaUtils.getAddress(trip.start, msBetweenRequests),
                parsedTime: DateTimeUtils.timestampToHourMinutes(trip.start.timestamp),
              }),
            })
            : Object.assign(trip, {
              start: Object.assign(trip.start, {
                parsedAddress: await TripsSagaUtils.getAddress(trip.start, msBetweenRequests),
                parsedTime: DateTimeUtils.timestampToHourMinutes(trip.start.timestamp),
              }),
              end: Object.assign(trip.end, {
                parsedAddress: await TripsSagaUtils.getAddress(trip.end, msBetweenRequests),
                parsedTime: DateTimeUtils.timestampToHourMinutes(trip.end.timestamp),
              }),
            })),
      ),
    );
    yield put({ type: UPDATE_TRIPS_SUCCESSFUL, trips, thingId });
    yield put({ type: LEFT_PANEL_UNSET_LOADING });
  } catch (error) {
    yield put({ type: LEFT_PANEL_UNSET_LOADING });
    throw error;
  }
}

function getMarkers(_path) {
  const markers = [_.head(_path), _.last(_path)].map((_marker, _index) => {
    const obj = {};
    obj.type = _index === 0 ? 'polyline-start' : 'polyline-end';
    obj.position = _marker;
    obj.defaultAnimation = null;
    obj.key = _index;
    return obj;
  });
  return markers;
}

export function* getTripDetail(action) {
  const tripsPayload = yield call(thingsService.getTripDetails, action.thingId, action.tripId);
  tripsPayload.polylinePath = getPolylinePath(tripsPayload.path);
  tripsPayload.durationHumanized = DateTimeUtils.secondsToMinutes(tripsPayload.duration);
  tripsPayload.tripDate = DateTimeUtils.timestampToDate(tripsPayload.start.timestamp);
  tripsPayload.polylineMarkers = getMarkers(tripsPayload.polylinePath);
  yield put({ type: UPDATE_TRIP_DETAILS_SUCCESSFUL, tripDetails: tripsPayload });
}

export default function* rootTripsSaga() {
  yield all([
    takeEvery(GET_TRIP_LIST, handleHttpErrors(getTrips, 'Ha ocurrido un error al cargar tus viajes')),
    takeEvery(SELECT_TRIP_DETAILS, handleHttpErrors(getTripDetail, 'Ha ocurrido un error al cargar el detalle de tus viajes')),
  ]);
}
