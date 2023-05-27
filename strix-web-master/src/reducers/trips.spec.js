/* eslint-env jasmine */

import { fromJS, List, is } from 'immutable';
import {
  UPDATE_TRIPS_SUCCESSFUL,
  RESET_TRIPS_LIST,
  SELECT_TRIP_DETAILS,
  UPDATE_TRIP_DETAILS_SUCCESSFUL,
  EXPAND_CARD,
  CHANGE_RANGE_SEGMENT,
} from '../constants';
import tripReducer from './trips';

const THING_ID = 'mrn:thing:vehicle:123';
const TRIP1_ID = 'trip_1';
const TRIP2_ID = 'trip_2';

const trip1 = {
  id: TRIP1_ID,
  start_mileage: 1234,
  created_timestamp: '1527674432129',
  thing_id: THING_ID,
  start: {
    parsedTime: '07:00',
    parsedAddress: 'Caballito 1102-1116',
    location: { type: 'Point', coordinates: [-34.456789, -58.66694] },
  },
  end: {
    parsedTime: '08:08',
    parsedAddress: 'Avellaneda, 12 de Octubre 5621',
    location: { type: 'Point', coordinates: [-34.1222, -58.2222] },
  },
};

const trip2 = {
  id: TRIP2_ID,
  start_mileage: 24512,
  created_timestamp: '1527647625791',
  thing_id: THING_ID,
  start: {
    parsedTime: '23:33',
    parsedAddress: 'Av Callao 565',
    location: { type: 'Point', coordinates: [-34.895, -58.021] },
  },
  end: {
    parsedTime: '23:56',
    parsedAddress: 'Cañitas 321, Palermo',
    location: { type: 'Point', coordinates: [-34.69212, -58.6005] },
  },
};

const actionTrip1 = {
  type: UPDATE_TRIPS_SUCCESSFUL,
  thingId: THING_ID,
  trips: [trip1],
};

describe('Trips reducer', () => {
  let state;
  let rangeStart;
  let rangeEnd;

  beforeEach(() => {
    state = tripReducer(undefined, {});
    rangeStart = state.getIn(['dateRange', 'rangeStart']);
    rangeEnd = state.getIn(['dateRange', 'rangeEnd']);
  });

  it('should add a new trip', () => {
    const newState = tripReducer(undefined, actionTrip1);
    const expectedTrips = newState.getIn(['list', THING_ID]);
    const tripAdded = fromJS([trip1]);
    expect(tripAdded).toEqual(expectedTrips);
  });

  it('should update a trip', () => {
    const oldState = tripReducer(undefined, actionTrip1);
    const actionTrip2 = {
      type: UPDATE_TRIPS_SUCCESSFUL,
      thingId: THING_ID,
      trips: [trip2],
    };
    const newState = tripReducer(oldState, actionTrip2);
    const newTrips = newState.getIn(['list', THING_ID]);
    expect(newTrips).toEqual(fromJS([trip1, trip2]));
  });

  it('should remove trips trip', () => {
    const action = { type: RESET_TRIPS_LIST, thingId: THING_ID };
    const oldState = tripReducer(undefined, actionTrip1);

    const newState = tripReducer(oldState, action);

    expect(is(newState.getIn(['list', action.thingId]), new List())).toEqual(true);
  });

  it('should select trip details', () => {
    const action = { type: SELECT_TRIP_DETAILS, tripId: TRIP1_ID };

    const newState = tripReducer(state, action);
    const expectedState = fromJS({
      list: [],
      selectedTripId: TRIP1_ID,
      selectedTripDetails: {},
      loadingTrip: true,
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    expect(newState).toEqual(expectedState);
  });

  it('should unselect trip id if selects same id', () => {
    const action = { type: SELECT_TRIP_DETAILS, tripId: TRIP1_ID };
    const actualState = fromJS({
      list: [],
      selectedTripId: TRIP1_ID,
      selectedTripDetails: {},
      loadingTrip: true,
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    const newState = tripReducer(actualState, action);
    const expectedState = fromJS({
      list: [],
      selectedTripId: '',
      selectedTripDetails: {},
      loadingTrip: true,
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    expect(newState).toEqual(expectedState);
  });

  it('should update trip details', () => {
    const action = { type: UPDATE_TRIP_DETAILS_SUCCESSFUL, tripDetails: trip2 };
    const actualState = fromJS({
      list: [],
      selectedTripId: '',
      selectedTripDetails: trip1,
      loadingTrip: false,
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    const newState = tripReducer(actualState, action);
    const expectedState = fromJS({
      list: [],
      selectedTripId: '',
      selectedTripDetails: trip2,
      loadingTrip: false,
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    expect(newState).toEqual(expectedState);
  });

  it('should remove trip details when we exapnd the card', () => {
    const action = { type: EXPAND_CARD };
    const actualState = fromJS({
      list: [],
      selectedTripId: '',
      selectedTripDetails: trip1,
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    const newState = tripReducer(actualState, action);
    const expectedState = fromJS({
      list: [],
      selectedTripId: '',
      selectedTripDetails: {},
      dateRange: {
        rangeStart,
        rangeEnd,
      },
    });

    expect(newState).toEqual(expectedState);
  });

  it('should update date ranges', () => {
    const start = '2018-07-23T17:39:46.807Z';
    const end = '2018-08-23T17:39:46.807Z';
    const action = { type: CHANGE_RANGE_SEGMENT, start, end };

    const newState = tripReducer(state, action);
    const expectedState = fromJS({
      list: [],
      selectedTripId: '',
      selectedTripDetails: {},
      loadingTrip: false,
      dateRange: {
        rangeStart: start,
        rangeEnd: end,
      },
    });

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = tripReducer(state, action);

    expect(newState).toBe(state);
  });
});
