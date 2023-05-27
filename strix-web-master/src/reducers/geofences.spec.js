/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import geofencesReducer from './geofences';
import {
  UPDATE_GEOFENCES_SUCCESSFUL,
  CREATE_GEOFENCE,
  CREATE_GEOFENCE_SUCCESS,
  DELETE_GEOFENCE_SUCCESS,
} from '../constants';


describe('Geofences reducer', () => {
  let state;

  beforeEach(() => {
    state = geofencesReducer(undefined, {});
  });

  it('should take the geofences list', () => {
    const action = { type: UPDATE_GEOFENCES_SUCCESSFUL, geofencesData: [{ id: 1 }, { id: 2 }] };
    const newState = geofencesReducer(undefined, action);
    const expectedState = fromJS({ createGeofenceIsLoading: false, data: [{ id: 1 }, { id: 2 }] });
    expect(newState).toEqual(expectedState);
  });

  it('should be set as loading when new geofence is being created', () => {
    const action = { type: CREATE_GEOFENCE };
    const newState = geofencesReducer(undefined, action);
    const expectedState = fromJS({ createGeofenceIsLoading: true, data: [] });
    expect(newState).toEqual(expectedState);
  });

  it('should add the newly created geofence to list', () => {
    const action = { type: CREATE_GEOFENCE_SUCCESS, data: { id: 125 } };
    const actualState = fromJS({ createGeofenceIsLoading: true, data: [] });
    const newState = geofencesReducer(actualState, action);
    const expectedState = fromJS({ createGeofenceIsLoading: false, data: [{ id: 125 }] });
    expect(newState).toEqual(expectedState);
  });

  it('should delete geofence by id', () => {
    const GEOFENCE_ID = 125;
    const createAction = { type: CREATE_GEOFENCE_SUCCESS, data: { id: GEOFENCE_ID } };
    const actualState = geofencesReducer(state, createAction);
    const action = { type: DELETE_GEOFENCE_SUCCESS, id: GEOFENCE_ID };

    const newState = geofencesReducer(actualState, action);

    const geofenceList = newState.get('data').filter(x => x.id === GEOFENCE_ID);
    expect(geofenceList.size).toEqual(0);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = geofencesReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
