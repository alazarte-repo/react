import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';
import { history } from '../store';
import { geofencesService } from '../services';
import { handleHttpErrors } from './handleErrors';
import {
  UPDATE_GEOFENCES,
  UPDATE_GEOFENCES_SUCCESSFUL,
  CREATE_GEOFENCE,
  CREATE_GEOFENCE_SUCCESS,
  DELETE_GEOFENCE,
  DELETE_GEOFENCE_SUCCESS,
  ERROR,
  SUCCESS,
} from '../constants';


export function* getGeofences() {
  const geofencesData = yield call(geofencesService.getGeofences);
  yield put({ type: UPDATE_GEOFENCES_SUCCESSFUL, geofencesData });
}

export function* createGeofence(action) {
  const geofenceData = {
    type: 'Feature',
    geometry: {
      type: 'Circle',
      coordinates: [action.data.center.lat, action.data.center.lng],
      radius: action.data.radius > 50 ? action.data.radius : 50,
    },
    properties: {
      radius_units: 'm',
      name: action.data.name,
    },
  };
  const geofence = yield call(geofencesService.create, geofenceData);
  yield put({ type: CREATE_GEOFENCE_SUCCESS, data: geofence });
  if (action.data.radius < 50) {
    yield put({
      type: SUCCESS,
      state: {
        status: true,
        message: 'El diametro minimo de la zona segura es de 100 metros',
      },
    });
  } else {
    yield put({
      type: SUCCESS,
      state: {
        status: true,
        message: 'Se ha creado con exito tu nueva zona segura',
      },
    });
  }

  yield call(history.goBack);
}

export function* deleteGeofence(action) {
  try {
    yield call(geofencesService.delete, action.id);
    yield put({ type: DELETE_GEOFENCE_SUCCESS, id: action.id });
    yield put({
      type: SUCCESS,
      state: {
        status: true,
        message: 'Se ha eliminado con exito tu zona segura',
      },
    });
  } catch (error) {
    if (error.request && error.request.status === 500) {
      yield put({
        type: ERROR,
        state: {
          status: true,
          message: 'No se pudo eliminar la zona porque está siendo usada por un vehículo. Para poder eliminarla, primero seleccioná otra zona segura.',
        },
      });
    } else {
      throw (error);
    }
  }
}


export default function* rootThingsSaga() {
  yield all([
    takeEvery(UPDATE_GEOFENCES, handleHttpErrors(getGeofences)),
    takeEvery(CREATE_GEOFENCE, handleHttpErrors(createGeofence)),
    takeLatest(DELETE_GEOFENCE, handleHttpErrors(deleteGeofence)),
  ]);
}
