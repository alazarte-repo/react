import { START_BACKGROUND_SYNC, STOP_BACKGROUND_SYNC } from '../constants';

export const startBackgroundSync = () => ({
  type: START_BACKGROUND_SYNC,
});

export const stopBackgroundSync = () => ({
  type: STOP_BACKGROUND_SYNC,
});
