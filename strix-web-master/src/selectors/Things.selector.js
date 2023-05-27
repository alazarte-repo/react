import { createSelector } from 'reselect';
import { Map } from 'immutable';
import moment from 'moment';
import memoize from 'lodash.memoize';
import { actionCategories } from '../reducers/thingsActions';

/* General */
export const isThingsFirstLoad = state => state.getIn(['things', 'firstLoad']);

/* Home selectors */
export const getAgents = state => state.getIn(['agents', 'list']);
export const getThings = state => state.getIn(['things', 'list']);
export const getTrips = state => state.get('trips');
export const getSelectedTripMadeId = state => state.getIn(['tripsMade', 'selectedTripId']);
export const getLeftPanel = state => state.get('leftPanel');


/* Flex Selectors */
const locationHistory = state => state.get('locationHistory');

export const getSelectedLocationId = createSelector(locationHistory, locations =>
  locations.get('selectedLocationId'),
);

export const getFlexs = createSelector(locationHistory, locations => locations.get('list'));

/* Vehicle Selectors */
const tripList = state => state.getIn(['trips', 'list']);
export const getTripListByThingId = createSelector(
  tripList,
  (_, prop) => prop,
  (trip, prop) => trip.getIn(['byThing', prop], new Map()),
);

export const getSelectedTripId = createSelector(getTrips, trips => trips.get('selectedTripId'));

// Reminders subsection
export const getHistoryPage = state => state.getIn(['reminders', 'historyPage']);

/* ThingCards Selectors */
export const getSelectedServiceNotification = createSelector(getLeftPanel, leftPanel =>
  leftPanel.get('selectedServiceNotification'),
);

export const getThingsCenters = createSelector(getThings, things =>
  things.map(thing => thing.get('center')),
);

/* Signals */
export const getSignals = createSelector(
  state => state.getIn(['signals', 'list']),
  signals => signals.map(value => value.set('parsed_timestamp', moment.unix(value.get('event_timestamp') / 1000).format('MM/DD/YYYY')))
    .groupBy(v => v.get('parsed_timestamp')),
);

/**
 *  Action executions
 */

/* Generic */

const actionExecutionLoadingSelector = category => createSelector(
  state => state.getIn(['thingsActions', category]),
  categoryStates => memoize(
    thingId => categoryStates.has(thingId) && categoryStates.getIn([thingId, 'loading']),
  ),
);

const getActionExecutionErrorSelector = category => createSelector(
  state => state.getIn(['thingsActions', category]),
  categoryStates => memoize(
    (thingId) => {
      if (categoryStates.has(thingId)) {
        return categoryStates.getIn([thingId, 'error']);
      }
      return null;
    },
  ),
);

/* Home Alarms */
export const isAlarmLoading = actionExecutionLoadingSelector(actionCategories.HomeAlarm);
export const getAlarmError = getActionExecutionErrorSelector(actionCategories.HomeAlarm);

/* Fuel Cut */
export const isFuelCutPolling = actionExecutionLoadingSelector(actionCategories.FuelCut);
