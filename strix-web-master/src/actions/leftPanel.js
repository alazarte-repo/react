import {
  SELECT_CARD,
  EXPAND_CARD,
  SHOW_ALL_GEOFENCES,
} from '../constants';


export const selectCard = id => ({
  type: SELECT_CARD,
  id,
});

export const expandCard = id => ({
  type: EXPAND_CARD,
  id,
});

export const showAllGeofences = id => ({
  type: SHOW_ALL_GEOFENCES,
  id,
});

