/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { updateSharedLocations } from './sharedLocations';
import { sharedLocationService } from '../services';
import { TripsSagaUtils } from '../utils/TripsSagaUtils';
import {
  GET_FAMILY_USERS,
  UPDATE_SHARED_LOCATIONS_SUCCESS,
} from '../constants';

const sharedLocationResponse1 = [
  {
    location: {
      accuracy: [

      ],
      coordinates: [
        -32.979353,
        -60.665343,
        0.0,
      ],
      type: 'Point',
    },
    location_timestamp: 1530046575261,
    user_id: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
  },
];

const formattedAddressResponse1 = [
  'Pres. Quintana 2453-2401',
];

const sharedLocationResponseFormatted1 = [
  {
    user_id: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    center: {
      lat: -32.979353,
      lng: -60.665343,
    },
    location: 'Pres. Quintana 2453-2401',
    parsedTime: '26/6/2018',
    type: undefined,
  },
];

const sharedLocationResponse2 = [
  {
    location: {
      accuracy: [

      ],
      coordinates: [
        -32.979353,
        -60.665343,
        0.0,
      ],
      type: 'Point',
    },
    location_timestamp: 1530046575261,
    user_id: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
  },
  {
    location: {
      accuracy: [

      ],
      coordinates: [
        -32.956099,
        -60.650732,
        0.0,
      ],
      type: 'Point',
    },
    location_timestamp: 1530046575261,
    user_id: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  },
];

const formattedAddressResponse2 = [
  'Pres. Quintana 2453',
  'Italia 1758',
];

const sharedLocationResponseFormatted2 = [
  {
    user_id: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    center: {
      lat: -32.979353,
      lng: -60.665343,
    },
    location: 'Pres. Quintana 2453',
    parsedTime: '26/6/2018',
    type: undefined,
  },
  {
    user_id: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
    center: {
      lat: -32.956099,
      lng: -60.650732,
    },
    location: 'Italia 1758',
    parsedTime: '26/6/2018',
    type: undefined,
  },
];


describe('sharedLocations saga test', () => {
  it('should get zero shared location', () => {
    testSaga(updateSharedLocations)
      .next()
      .putResolve({ type: GET_FAMILY_USERS, retryOn401: false })
      .next()
      .call(sharedLocationService.getSharedLocations)
      .next([])
      .all([].map(item => call(TripsSagaUtils.getAddress, item)))
      .next([])
      .put({ type: UPDATE_SHARED_LOCATIONS_SUCCESS, list: [] })
      .next()
      .isDone();
  });

  it('should get one shared location', () => {
    testSaga(updateSharedLocations)
      .next()
      .putResolve({ type: GET_FAMILY_USERS, retryOn401: false })
      .next()
      .call(sharedLocationService.getSharedLocations)
      .next(sharedLocationResponse1)
      .all(sharedLocationResponse1.map(item => call(TripsSagaUtils.getAddress, item)))
      .next(formattedAddressResponse1)
      .put({ type: UPDATE_SHARED_LOCATIONS_SUCCESS, list: sharedLocationResponseFormatted1 })
      .next()
      .isDone();
  });

  it('should more than one shared locations', () => {
    testSaga(updateSharedLocations)
      .next()
      .putResolve({ type: GET_FAMILY_USERS, retryOn401: false })
      .next()
      .call(sharedLocationService.getSharedLocations)
      .next(sharedLocationResponse2)
      .all(sharedLocationResponse2.map(item => call(TripsSagaUtils.getAddress, item)))
      .next(formattedAddressResponse2)
      .put({ type: UPDATE_SHARED_LOCATIONS_SUCCESS, list: sharedLocationResponseFormatted2 })
      .next()
      .isDone();
  });
});

