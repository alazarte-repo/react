import { GET_PREFERENCES, UPDATE_PREFERENCES, RESET_PREFERENCES } from '../constants';


export const getPreferences = thingId => ({
  type: GET_PREFERENCES,
  thingId,
});

export const updatePreferences = (thingId, values) => ({
  type: UPDATE_PREFERENCES,
  thingId,
  values,
});

export const resetPreferences = () => ({
  type: RESET_PREFERENCES,
});

export default {
  getPreferences,
  updatePreferences,
  resetPreferences,
};
