import { fromJS } from 'immutable';
import {
  UPDATE_GEOFENCES_SUCCESSFUL,
  CREATE_GEOFENCE,
  CREATE_GEOFENCE_SUCCESS,
  DELETE_GEOFENCE_SUCCESS,
} from '../constants';

const initialState = fromJS({
  createGeofenceIsLoading: false,
  data: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_GEOFENCES_SUCCESSFUL:
      return state.set('data', fromJS(action.geofencesData));
    case CREATE_GEOFENCE:
      return state.set('createGeofenceIsLoading', true);
    case CREATE_GEOFENCE_SUCCESS:
      return state
        .set('createGeofenceIsLoading', false)
        .update('data', v => v.push(fromJS(action.data)));
    case DELETE_GEOFENCE_SUCCESS:
      return state
        .update('data', v => v.filter(geofence => geofence.get('id') !== action.id));
    default:
      return state;
  }
}
