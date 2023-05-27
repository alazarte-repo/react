import { takeEvery, all, call, put } from 'redux-saga/effects';
import { homeServices } from '../services';
import utilSignals from '../utils/Signal';
import { handleHttpErrors } from './handleErrors';
import serializeCamera from '../serializers/camera';

import { GET_SIGNALS,
  GET_SIGNALS_SUCCESS,
  GET_CAMERAS,
  GET_CAMERAS_SUCCESS,
  UPDATE_CAMERA,
  UPDATE_CAMERA_SUCCESS,
  DELETE_CAMERA,
  DELETE_CAMERA_SUCCESS,
  REFRESH_THING,
} from '../constants';


export function* getSignals(action) {
  const signalsPayload = yield call(homeServices.get, action.thingId);
  const signals = utilSignals.filterError(signalsPayload);
  const completeSignals = utilSignals.completeData(signals);
  const finalSignals = utilSignals.deleteRecordsLessTime(completeSignals);
  yield put({ type: GET_SIGNALS_SUCCESS, signals: finalSignals });
}

export function* modifyCamera(action) {
  const body = [
    {
      action: 'update',
      value: action.body.label,
      path: '/label',
    },
  ];
  const modifyCameraPayload = yield call(homeServices.patch, action.body.cameraId, body);
  yield put({ type: UPDATE_CAMERA_SUCCESS, camera: modifyCameraPayload });
}

export function* deleteCamera({ cameraId, thingId }) {
  yield call(homeServices.remove, cameraId);
  yield put({ type: DELETE_CAMERA_SUCCESS, cameraId });
  yield put({ type: REFRESH_THING, thingId });
}

export function* getCameras(action) {
  let camerasPayload = yield all(
    action.cameras.map(camera => call(homeServices.getCameras, camera)),
  );
  camerasPayload = yield all(camerasPayload.map(x => serializeCamera(x, false)));
  yield put({ type: GET_CAMERAS_SUCCESS, cameras: camerasPayload });
}

export default function* rootHomeSagas() {
  yield all([
    takeEvery(GET_SIGNALS, handleHttpErrors(getSignals)),
    takeEvery(GET_CAMERAS, handleHttpErrors(getCameras)),
    takeEvery(DELETE_CAMERA, handleHttpErrors(deleteCamera)),
    takeEvery(UPDATE_CAMERA, handleHttpErrors(modifyCamera)),
  ]);
}
