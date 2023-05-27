import { put, putResolve, takeEvery, all, call } from 'redux-saga/effects';
import { sharedLocationService } from '../services';
import { handleHttpErrors } from './handleErrors';
import {
  GET_FAMILY_USERS,
  UPDATE_SHARED_LOCATIONS,
  UPDATE_SHARED_LOCATIONS_SUCCESS,
} from '../constants';
import { TripsSagaUtils } from '../utils/TripsSagaUtils';
import DateTimeUtils from '../utils/DateTimeUtils';


export function* updateSharedLocations() {
  yield putResolve({ type: GET_FAMILY_USERS, retryOn401: false });
  const sharedLocationsPayload = yield call(sharedLocationService.getSharedLocations);
  const addresses = yield all(sharedLocationsPayload.map(item =>
    call(TripsSagaUtils.getAddress, item)));
  const fillList = sharedLocationsPayload.map((item, index) => {
    const { coordinates } = item.location;
    return {
      user_id: item.user_id,
      center: { lat: coordinates[0], lng: coordinates[1] },
      location: addresses[index],
      parsedTime: DateTimeUtils.timestampHumanizer(item.location_timestamp),
      type: item.type,
    };
  });

  yield put({ type: UPDATE_SHARED_LOCATIONS_SUCCESS, list: fillList });
}

export default function* rootSharedLocations() {
  yield all([
    takeEvery(UPDATE_SHARED_LOCATIONS, handleHttpErrors(updateSharedLocations)),
  ]);
}
