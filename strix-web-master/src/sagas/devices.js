import { put, call, takeEvery, all, takeLatest, select } from 'redux-saga/effects';
import { devices } from '../services';
import { handleHttpErrors } from './handleErrors';

import {
  GET_DEVICES,
  GET_DEVICES_SUCCESS,
  REVOKE_DEVICE,
  REVOKE_DEVICE_SUCCESS,
  SUCCESS,
} from '../constants';

export function* getDevices() {
  const deviceList = yield call(devices.get);
  yield put({ type: GET_DEVICES_SUCCESS, deviceList });
}

export function* revokeDevice({ deviceId }) {
  yield call(devices.deleteDevice, deviceId);
  yield put({ type: REVOKE_DEVICE_SUCCESS, deviceId });
}

export function* notifyRevokeSuccess() {
  const deviceList = yield select(state => state.getIn(['userData', 'devices']));
  if (deviceList.size === 1) {
    yield put({
      type: SUCCESS,
      state: {
        status: true,
        message: 'Se han eliminado tus dispositivos con exito',
      },
    });
  }
}

export default function* rootDevicesSaga() {
  yield all([
    takeLatest(GET_DEVICES, handleHttpErrors(getDevices)),
    takeEvery(REVOKE_DEVICE, handleHttpErrors(revokeDevice, 'Ha ocurrido un error al eliminar tus dispositivos')),
    takeLatest(REVOKE_DEVICE_SUCCESS, notifyRevokeSuccess),
  ]);
}
