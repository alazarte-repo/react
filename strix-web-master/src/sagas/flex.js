import { put, takeEvery, all, call } from 'redux-saga/effects';
import { thingsService } from '../services';
import DateTimeUtils from '../utils/DateTimeUtils';
import { TripsSagaUtils, getPolylinePath } from '../utils/TripsSagaUtils';
import { setSelectedLocation } from '../actions/flex';
import { handleHttpErrors } from './handleErrors';

import {
  GET_LOCAL_HISTORY,
  GET_LOCAL_HISTORY_SUCCESFUL,
  UPDATE_LOCAL_HISTORY_SUCCESFUL,
  SELECT_LOCATIONS,
} from '../constants';

export function* getFlex({ flexId, page }) {
  const flexPayload = yield call(thingsService.getFlexs, flexId, page);
  const flexs = yield all(
    flexPayload.map(
      async flex => ({
        ...flex,
        parsedAddress: await TripsSagaUtils.getAddress(flex),
        parsedTime: DateTimeUtils.timestampToHourMinutes(flex.timestamp),
        date: DateTimeUtils.timestampToDate(flex.timestamp),
        dateUrl: DateTimeUtils.timestampToBasicDate(flex.timestamp),
      }),
    ),
  );

  const type = page === 1 ? GET_LOCAL_HISTORY_SUCCESFUL : UPDATE_LOCAL_HISTORY_SUCCESFUL;
  yield put({ type, flexs, flexId });
}

function getMarkers(_path) {
  const markers = _path.map((_marker, _index) => {
    const obj = {};
    obj.position = _marker;
    obj.defaultAnimation = null;
    obj.key = _index;
    return obj;
  });
  return markers;
}

export function* getDetailLocation({ locations, date }) {
  const selectedLocation = {};
  selectedLocation.polylinePath = getPolylinePath(locations);
  selectedLocation.markers = getMarkers(selectedLocation.polylinePath);
  selectedLocation.date = date;

  yield put(setSelectedLocation(selectedLocation));
}

export default function* rootFlexSaga() {
  yield all([
    takeEvery(GET_LOCAL_HISTORY, handleHttpErrors(getFlex)),
    takeEvery(SELECT_LOCATIONS, handleHttpErrors(getDetailLocation))]);
}
