/* eslint-env jasmine */

import { testSaga } from 'redux-saga-test-plan';
import { geofencesService } from '../services';
import { history } from '../store';
import { getGeofences, createGeofence, deleteGeofence } from './geofences';
import {
  UPDATE_GEOFENCES,
  UPDATE_GEOFENCES_SUCCESSFUL,
  CREATE_GEOFENCE,
  CREATE_GEOFENCE_SUCCESS,
  DELETE_GEOFENCE,
  DELETE_GEOFENCE_SUCCESS,
  SUCCESS,
  ERROR,
} from '../constants';


describe('geofences saga', () => {
  it('should get all geofences', () => {
    const testGeofences = [{ id: 1 }, { id: 2 }];
    const action = { type: UPDATE_GEOFENCES };
    testSaga(getGeofences, action)
      .next()
      .call(geofencesService.getGeofences)
      .next(testGeofences)
      .put({ type: UPDATE_GEOFENCES_SUCCESSFUL, geofencesData: testGeofences })
      .next()
      .isDone();
  });

  it('should create geofence', () => {
    const testGeofence = {
      center: { lat: 8.385, lng: 47.601 },
      radius: '1000',
      name: 'Safe Zone',
    };
    const parsedTestGeofence = {
      type: 'Feature',
      geometry: {
        type: 'Circle',
        coordinates: [
          8.385,
          47.601,
        ],
        radius: '1000',
      },
      properties: {
        radius_units: 'm',
        name: 'Safe Zone',
      },
    };
    const testGeofenceReturn = { id: 1, name: 'Safe Zone' };
    const action = { type: CREATE_GEOFENCE, data: testGeofence };
    testSaga(createGeofence, action)
      .next()
      .call(geofencesService.create, parsedTestGeofence)
      .next(testGeofenceReturn)
      .put({ type: CREATE_GEOFENCE_SUCCESS, data: testGeofenceReturn })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha creado con exito tu nueva zona segura',
        },
      })
      .next()
      .call(history.goBack)
      .next()
      .isDone();
  });

  it('should create geofence with less than 50mts radius', () => {
    const testGeofence = {
      center: { lat: 8.385, lng: 47.601 },
      radius: 45,
      name: 'Safe Zone',
    };
    const parsedTestGeofence = {
      type: 'Feature',
      geometry: {
        type: 'Circle',
        coordinates: [
          8.385,
          47.601,
        ],
        radius: 50,
      },
      properties: {
        radius_units: 'm',
        name: 'Safe Zone',
      },
    };
    const testGeofenceReturn = { id: 1, name: 'Safe Zone' };
    const action = { type: CREATE_GEOFENCE, data: testGeofence };
    testSaga(createGeofence, action)
      .next()
      .call(geofencesService.create, parsedTestGeofence)
      .next(testGeofenceReturn)
      .put({ type: CREATE_GEOFENCE_SUCCESS, data: testGeofenceReturn })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'El diametro minimo de la zona segura es de 100 metros',
        },
      })
      .next()
      .call(history.goBack)
      .next()
      .isDone();
  });

  it('should delete a geofence', () => {
    const action = {
      type: DELETE_GEOFENCE,
      id: 'mrn:geofence:0d0f89cb-8dda-4d5b-99a0-03ba9401d1ed',
    };
    testSaga(deleteGeofence, action)
      .next()
      .call(geofencesService.delete, action.id)
      .next()
      .put({ type: DELETE_GEOFENCE_SUCCESS, id: action.id })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha eliminado con exito tu zona segura',
        },
      })
      .next()
      .isDone();
  });

  it('should notify geofence can not be deleted when error 500 is thrown', () => {
    const action = {
      type: DELETE_GEOFENCE,
      id: 'mrn:geofence:0d0f89cb-8dda-4d5b-99a0-03ba9401d1ed',
    };
    const error = new Error('error');
    error.request = { status: 500 };
    testSaga(deleteGeofence, action)
      .next()
      .call(geofencesService.delete, action.id)
      .throw(error)
      .put({
        type: ERROR,
        state: {
          status: true,
          message: 'No se pudo eliminar la zona porque está siendo usada por un vehículo. Para poder eliminarla, primero seleccioná otra zona segura.',
        },
      })
      .next()
      .isDone();
  });

  it('should notify geofence can not be deleted when error 500 is thrown', () => {
    const action = {
      type: DELETE_GEOFENCE,
      id: 'mrn:geofence:0d0f89cb-8dda-4d5b-99a0-03ba9401d1ed',
    };
    const error = new Error('error');
    error.request = { status: 100 };
    try {
      testSaga(deleteGeofence, action)
        .next()
        .call(geofencesService.delete, action.id)
        .throw(error);
    } catch (err) {
      expect(err).toBe(error);
    }
  });
});
