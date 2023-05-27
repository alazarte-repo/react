import { fromJS } from 'immutable';
import {
  GET_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCES_SUCCESS,
  RESET_PREFERENCES,
} from '../constants';

const initialState = fromJS({
  list: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PREFERENCES_SUCCESS:
      return !state.get('list').has(action.thingId) ? state.setIn(['list', action.thingId], fromJS(action.preferences)) : state;
    case UPDATE_PREFERENCES_SUCCESS:
      return state.updateIn(['list', action.thingId], (obj) => {
        const preferences = { ...obj.toJS(), ...action.values };
        return fromJS(preferences);
      });
    case RESET_PREFERENCES:
      return initialState;
    default:
      return state;
  }
}
