import {
  UPDATE_GEOFENCES,
  UPDATE_GEOFENCES_SUCCESSFUL,
  UPDATE_GEOFENCES_ERROR,
  CREATE_GEOFENCE,
  DELETE_GEOFENCE,
} from '../constants';

export const updateGeofences = () => ({
  type: UPDATE_GEOFENCES,
});

export const updateGeofencesSuccessful = geofencesData => ({
  type: UPDATE_GEOFENCES_SUCCESSFUL,
  geofencesData,
});

export const updateGeofencesError = error => ({
  type: UPDATE_GEOFENCES_ERROR,
  error,
});

export const createGeofence = data => ({
  type: CREATE_GEOFENCE,
  data,
});

export const deleteGeofence = id => ({
  type: DELETE_GEOFENCE,
  id,
});
