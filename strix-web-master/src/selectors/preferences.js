import { createSelector } from 'reselect';

const getThings = state => state.getIn(['things', 'list']);
const getAllPreferences = state => state.get('preferences');

export const getThingPreferences = createSelector(
  getAllPreferences,
  preferences => preferences.get('list').toJS(),
);

export const getThingType = createSelector(
  getThings,
  (_, prop) => prop,
  (things, id) => things.find(t => t.get('id') === id).get('type'),
);

export default {
  getThingPreferences,
  getThingType,
};
