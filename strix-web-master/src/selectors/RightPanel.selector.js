import memoize from 'lodash.memoize';
import { returnGeofences } from 'utils/geofences';
import { createSelector } from 'reselect';
import { List } from 'immutable';

/* RightPanel Selectors */
const getLeftPanel = state => state.get('leftPanel');
const getThings = state => state.get('things');
const getRightPanel = state => state.get('rightPanel');
const getTrips = state => state.get('trips');
const getLocations = state => state.get('locationHistory');

export const isLoading = createSelector(
  getThings,
  things => things.get('isLoading'),
);
export const getSelectedService = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('selectedServiceNotification'),
);
export const showConfiguration = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('showThingConfiguration'),
);
export const renderComponent = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('renderRightPanel'),
);
/* Map Selectors */
const getAgents = state => state.get('agents');
export const agentList = createSelector(
  getAgents,
  agents => agents.get('list'),
);
const getAllGeofences = state => state.get('geofences');
export const geofencesList = createSelector(
  getAllGeofences,
  geofences => geofences.get('data'),
);
export const thingsList = createSelector(
  getThings,
  things => things.get('list'),
);
export const selectedThingId = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('selectedCardId'),
);
export const getHighlightedGeofences = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('highlightedGeofences'),
);
export const getGeofences = createSelector(
  agentList,
  geofencesList,
  (agents, geofences) => geofences
    .filter(geofence => geofence.getIn(['data', 'geometry', 'type']) === 'Circle'));
export const getThingSelected = createSelector(
  thingsList,
  selectedThingId,
  (things, selectedThing) => things
    .find(thing => thing.getIn(['id']) === selectedThing));
export const getSelectedThingCenter = createSelector(
  getThingSelected,
  thing => thing.get('center'),
);
export const getSelectedThingLocation = createSelector(
  getThingSelected,
  thing => thing.get('location'),
);
export const getSelectedThingType = createSelector(
  getThingSelected,
  thing => thing.get('type'),
);
export const getThingGeofences = createSelector(
  agentList,
  geofencesList,
  (agents, geofences) => memoize(
    (thingId) => {
      const thingGeofences = returnGeofences(thingId, agents);
      let filteredGeofences;
      if (thingGeofences == null) {
        return new List();
      } else if (thingGeofences.size === 0) {
        filteredGeofences = geofences;
      } else {
        filteredGeofences = geofences.filter(g => thingGeofences.includes(g.get('id')));
      }
      return filteredGeofences.filter(geofence => geofence.getIn(['data', 'geometry', 'type']) === 'Circle');
    },
  ),
);
export const getSelectedThingGeofences = createSelector(
  selectedThingId,
  agentList,
  geofencesList,
  (thingID, agents, geofences) => {
    const thingGeofences = returnGeofences(thingID, agents);
    let filteredGeofences;
    if (thingGeofences == null) {
      return new List();
    } else if (thingGeofences.size === 0) {
      filteredGeofences = geofences;
    } else {
      filteredGeofences = thingGeofences.map(id => geofences.find(geofence => geofence.get('id') === id));
    }
    return filteredGeofences.filter(geofence => geofence != null && geofence.getIn(['data', 'geometry', 'type']) === 'Circle');
  },
);
export const getSelectedComponent = createSelector(
  getRightPanel,
  rightPanel => rightPanel.get('selectedComponent'),
);
export const getSelectedTripDetails = createSelector(
  getTrips,
  trips => trips.get('selectedTripDetails'),
);
/* locations */
export const getSelectedLocation = createSelector(
  getLocations,
  locations => locations.get('selectedLocation'),
);
export const getAllLocations = createSelector(
  getLocations,
  locations => locations.get('list'),
);
/* shared locations */
const getFilteredSharedLocations = createSelector(
  state => state.get('sharedLocations'),
  state => state.getIn(['userData', 'user', 'id']),
  (sharedLocations, userId) => sharedLocations.update('list', list => list.filter(member => member.get('user_id') !== userId)),
);
/* markers default map */
export const getAllMarkers = createSelector(
  thingsList,
  getFilteredSharedLocations,
  (things, sharedLocations) => {
    const markers = things.toJS().map(thing => ({
      thingId: thing.id,
      position: thing.center,
      key: thing.id,
      defaultAnimation: 3,
      type: thing.type,
      subtype: thing.subtype || null,
    }));
    const memberLocations = sharedLocations.get('list').toJS();
    memberLocations.forEach((member) => {
      markers.push({
        thingId: member.user_id,
        position: member.center,
        key: member.user_id,
        defaultAnimation: 3,
        type: sharedLocations.get('type'),
        subtype: null,
      });
    });

    return markers;
  },
);
