import { fromJS } from 'immutable';
import {
  SELECT_LOCATION_ID,
  UPDATE_LOCAL_HISTORY_SUCCESFUL,
  GET_LOCAL_HISTORY_SUCCESFUL,
  RESET_LOCAL_HISTORY,
  SELECT_LOCATIONS_SUCCESFUL,
} from '../constants';

const initialState = fromJS({
  list: [],
  selectedLocationId: '',
  selectedLocation: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_LOCATION_ID:
      return state.set('selectedLocationId', action.id);
    case GET_LOCAL_HISTORY_SUCCESFUL:
      return state.set('list', fromJS(action.flexs));
    case UPDATE_LOCAL_HISTORY_SUCCESFUL:
      return state.update('list', list => list.concat(fromJS(action.flexs)));
    case RESET_LOCAL_HISTORY:
      return initialState;
    case SELECT_LOCATIONS_SUCCESFUL:
      return state.set('selectedLocation', fromJS(action.selectedLocation));
    default:
      return state;
  }
}
