import { fromJS } from 'immutable';
import {
  GET_AGENTS_SUCCESSFUL,
  ADD_AGENT_SUCCESS,
  DELETE_AGENT_SUCCESS,
  ASSIGN_GEOFENCE,
  ASSIGN_GEOFENCE_SUCCESS,
  ASSIGN_GEOFENCE_ERROR,
  DEACTIVATE_GEOFENCE,
  DEACTIVATE_GEOFENCE_SUCCESS,
  UPDATE_AGENT_SUCCESS,
  UPDATE_GEOFENCE_LOCATION,
  UPDATE_GEOFENCE_LOCATION_ERROR,
  UPDATE_GEOFENCE_LOCATION_SUCCESS,
} from '../constants';

const initialState = fromJS({
  assingGeofenceLoading: false,
  list: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AGENTS_SUCCESSFUL:
      return state.set('list', fromJS(action.agentsData));
    case ADD_AGENT_SUCCESS:
      return state.update('list', list => list.push(fromJS(action.agent)));
    case DELETE_AGENT_SUCCESS:
      return state
        .update('list', list =>
          list.filter(v => v.get('id') !== action.agentId),
        );
    case ASSIGN_GEOFENCE_SUCCESS:
      return state.update('list', list => list.push(fromJS(action.newGeofence)))
        .set('assingGeofenceLoading', false);
    case ASSIGN_GEOFENCE:
    case UPDATE_GEOFENCE_LOCATION:
    case DEACTIVATE_GEOFENCE:
      return state.set('assingGeofenceLoading', true);
    case ASSIGN_GEOFENCE_ERROR:
    case DEACTIVATE_GEOFENCE_SUCCESS:
    case UPDATE_GEOFENCE_LOCATION_ERROR:
    case UPDATE_GEOFENCE_LOCATION_SUCCESS:
      return state.set('assingGeofenceLoading', false);
    case UPDATE_AGENT_SUCCESS:
      return state.update('list', (list) => {
        const index = list.findIndex(agent => agent.get('id') === action.agentId);
        return (list.set(index, fromJS(action.updatedAgent)));
      });
    default:
      return state;
  }
}
