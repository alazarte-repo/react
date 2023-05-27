import {
  CHANGE_RANGE_SEGMENT,
  SELECT_TRIP,
  SELECT_TRIP_DETAILS,
  UPDATE_TRIP_DETAILS_SUCCESSFUL,
  GET_TRIP_LIST,
  RESET_TRIPS_LIST,
} from '../constants';

export const selectTrip = tripId => ({
  type: SELECT_TRIP,
  tripId,
});

export const selectTripDetails = (thingId, tripId) => ({
  type: SELECT_TRIP_DETAILS,
  thingId,
  tripId,
});

export const updateTripDetailsSucessful = tripDetails => ({
  type: UPDATE_TRIP_DETAILS_SUCCESSFUL,
  tripDetails,
});

export const changeRangeSegment = newFormState => ({
  type: CHANGE_RANGE_SEGMENT,
  ...newFormState,
});

export const showTripList = (thingId, page) => ({
  type: GET_TRIP_LIST,
  thingId,
  page,
});

export const resetTripsList = thingId => ({
  type: RESET_TRIPS_LIST,
  thingId,
});

export default {
  selectTrip,
  selectTripDetails,
  updateTripDetailsSucessful,
  changeRangeSegment,
};
