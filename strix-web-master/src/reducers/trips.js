import { fromJS, List } from 'immutable';
import {
  UPDATE_TRIPS_SUCCESSFUL,
  SELECT_TRIP_DETAILS,
  UPDATE_TRIP_DETAILS_SUCCESSFUL,
  CHANGE_RANGE_SEGMENT,
  EXPAND_CARD,
  RESET_TRIPS_LIST,
} from '../constants';

// TODO: Merge this and fuelCut saga in a saga called selectedVehicle.jsx
const initialState = fromJS({
  list: [],
  selectedTripId: '',
  selectedTripDetails: {},
  loadingTrip: false,
  dateRange: {
    rangeStart: new Date().toISOString(),
    rangeEnd: new Date().toISOString(),
  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRIPS_SUCCESSFUL:
      return !state.get('list').has(action.thingId)
        ? state.set('list', fromJS(action.trips).groupBy(v => v.get('thing_id')))
        : state.updateIn(['list', action.thingId], thingTrips =>
          thingTrips.concat(fromJS(action.trips)),
        );
    case SELECT_TRIP_DETAILS:
      return state.update(
        'selectedTripId',
        tripId => (tripId === action.tripId ? '' : action.tripId),
      ).set('loadingTrip', true);
    case UPDATE_TRIP_DETAILS_SUCCESSFUL:
      return state.set('selectedTripDetails', fromJS(action.tripDetails))
        .set('loadingTrip', false);
    case EXPAND_CARD:
      return state.set('selectedTripDetails', fromJS({}));
    case CHANGE_RANGE_SEGMENT:
      return state.update('dateRange', v =>
        v.set('rangeStart', action.start).set('rangeEnd', action.end),
      );
    case RESET_TRIPS_LIST:
      return state.setIn(['list', action.thingId], new List());
    default:
      return state;
  }
}
