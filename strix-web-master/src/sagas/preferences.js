import { all, put, call, takeEvery } from 'redux-saga/effects';
import { handleHttpErrors } from './handleErrors';
import {
  GET_PREFERENCES,
  GET_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCES,
  UPDATE_PREFERENCES_SUCCESS,
  SUCCESS,
} from '../constants';
import preferencesService from '../services/preferences';


export function* getPreferences({ thingId }) {
  const preferencesPayload = yield call(preferencesService.get, thingId);
  yield put({ type: GET_PREFERENCES_SUCCESS, preferences: preferencesPayload, thingId });
}

export function* modifyPreferences({ thingId, values }) {
  yield call(preferencesService.put, thingId, values);
  yield put({ type: UPDATE_PREFERENCES_SUCCESS, thingId, values });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Tus notificaciones han sido modificadas con éxito',
    },
  });
}

export default function* rootPreferencesSagas() {
  yield all([
    takeEvery(GET_PREFERENCES, handleHttpErrors(getPreferences, 'Ha ocurrido un error al obtener tus preferencias.')),
    takeEvery(UPDATE_PREFERENCES, handleHttpErrors(modifyPreferences, 'Ha ocurrido un error al actualizar tus preferencias.')),
  ]);
}
