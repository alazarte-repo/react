/* eslint-env jasmine */

import { fromJS } from 'immutable';
import flexLocationsReducer from './locationHistory';
import {
  SELECT_LOCATION_ID,
  GET_LOCAL_HISTORY_SUCCESFUL,
  UPDATE_LOCAL_HISTORY_SUCCESFUL,
  RESET_LOCAL_HISTORY,
  SELECT_LOCATIONS_SUCCESFUL,
} from '../constants';

const locationHistory = [
  {
    datetime: '2018-08-23T14:30:50Z',
    heading: 330,
    location: {
      accuracy: [
        0,
        0,
      ],
      coordinates: [
        -34.514461,
        -58.518111,
        76.7,
      ],
      type: 'Point',
    },
    mileage: 881800,
    speed: 0,
    timestamp: 1535034650000,
    parsedAddress: 'Dr. José Ingenieros 3900',
    parsedTime: '11:30',
    date: 'Jueves, 23 agosto  2018',
    dateUrl: '23-8-2018',
  },
  {
    datetime: '2018-08-23T13:31:00Z',
    heading: 330,
    location: {
      accuracy: [
        0,
        0,
      ],
      coordinates: [
        -34.514585,
        -58.517995,
        70.6,
      ],
      type: 'Point',
    },
    mileage: 881800,
    speed: 0,
    timestamp: 1535031060000,
    parsedAddress: 'Dr. José Ingenieros 3900',
    parsedTime: '10:31',
    date: 'Jueves, 23 agosto  2018',
    dateUrl: '23-8-2018',
  },
];

const selectedLocationMock = {
  polylinePath: [
    'PolyLinePathObjects',
  ],
  markers: [
    'MarkersObejtcs',
  ],
  date: '23-8-2018',
};

describe('flex locations reducer', () => {
  let state;

  beforeEach(() => {
    state = flexLocationsReducer(undefined, {});
  });


  it('should select a location', () => {
    const action = { type: SELECT_LOCATION_ID, id: '1' };
    const newState = flexLocationsReducer(state, action);
    const expectedState = fromJS({ list: [], selectedLocationId: '1', selectedLocation: {} });
    expect(newState).toEqual(expectedState);
  });

  it('should set location history', () => {
    const action = { type: GET_LOCAL_HISTORY_SUCCESFUL, flexs: locationHistory };
    const newState = flexLocationsReducer(state, action);
    const expectedState = fromJS({
      list: locationHistory,
      selectedLocationId: '',
      selectedLocation: {},
    });
    expect(newState).toEqual(expectedState);
  });

  it('should update location history', () => {
    const action = { type: UPDATE_LOCAL_HISTORY_SUCCESFUL, flexs: locationHistory };
    const actualState = fromJS({
      list: locationHistory,
      selectedLocationId: '',
      selectedLocation: {},
    });

    const newState = flexLocationsReducer(actualState, action);
    const expectedState = fromJS({
      list: locationHistory.concat(locationHistory),
      selectedLocationId: '',
      selectedLocation: {},
    });

    expect(newState).toEqual(expectedState);
  });


  it('should reset local history', () => {
    const action = { type: RESET_LOCAL_HISTORY };
    const actualState = fromJS({
      list: locationHistory,
      selectedLocationId: '',
      selectedLocation: {},
    });

    const newState = flexLocationsReducer(actualState, action);
    const expectedState = fromJS({
      list: [],
      selectedLocationId: '',
      selectedLocation: {},
    });

    expect(newState).toEqual(expectedState);
  });

  it('should set selected location', () => {
    const action = { type: SELECT_LOCATIONS_SUCCESFUL, selectedLocation: selectedLocationMock };

    const newState = flexLocationsReducer(state, action);
    const expectedState = fromJS({
      list: [],
      selectedLocationId: '',
      selectedLocation: selectedLocationMock,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = flexLocationsReducer(state, action);

    expect(newState).toBe(state);
  });
});
