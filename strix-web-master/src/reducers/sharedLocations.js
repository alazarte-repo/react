import { fromJS } from 'immutable';
import { UPDATE_SHARED_LOCATIONS_SUCCESS, REMOVE_SHARED_LOCATION } from '../constants';
import CardType from '../constants/cardType';

const initialState = fromJS({
  type: CardType.Location,
  list: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SHARED_LOCATIONS_SUCCESS:
      return state.set('list', fromJS(action.list));
    case REMOVE_SHARED_LOCATION:
      return state.update('list', locations =>
        locations.filter(location => location.get('user_id') !== action.userId));
    default:
      return state;
  }
}
