import {
  GET_LOCAL_HISTORY,
  SELECT_LOCATIONS,
  SELECT_LOCATIONS_SUCCESFUL,
  RESET_LOCAL_HISTORY,
  SELECT_LOCATION_ID,
} from '../constants';

export const getLocalHistory = (flexId, page) => ({
  type: GET_LOCAL_HISTORY,
  flexId,
  page,
});

export const selectLocation = (locations, date) => ({
  type: SELECT_LOCATIONS,
  locations,
  date,
});

export const setSelectedLocation = selectedLocation => ({
  type: SELECT_LOCATIONS_SUCCESFUL,
  selectedLocation,
});

export const selectLocationId = id => ({
  type: SELECT_LOCATION_ID,
  id,
});

export const resetLocation = () => ({
  type: RESET_LOCAL_HISTORY,
});

export default {
  getLocalHistory,
  selectLocation,
  setSelectedLocation,
  selectLocationId,
  resetLocation,
};
