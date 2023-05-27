/* eslint-env jasmine */

import { testSaga } from 'redux-saga-test-plan';
import CardType from '../constants/cardType';
import { ThingType } from '../constants/thingType';
import { refreshThing } from './things';
import { thingsService, geocodeService } from '../services';
import {
  REFRESH_THING,
  REFRESH_THING_SUCCESS,
} from '../constants';


const testThing = {
  id: 'mrn:thing:3d43db1a-2bd9-45f9-a8ad-607e28161afa',
  things: [
    'mrn:thing:3080ab1a-abeb-25ba-1bad-707eb819b0c1',
  ],
  account_id: 'mrn:account:77e13a8b-085d-4f29-b235-f326c3a16050',
  type: ThingType.Vehicle,
  created_timestamp: 1494416254,
  info: {
    label: 'mi ford azul',
    color: 'blue',
    domain: 'AA378GF',
    make: 'Ford',
    model: 'Focus',
    year: 2016,
    engine_number: '10DG090034487',
    chassis_number: '936CLNFP0HB046643',
    subtype: 'car',
  },
  state: {
    mileage: 23000,
    location: {
      type: 'Point',
      accuracy: [10.01, 0.02],
      coordinates: [-34.570255, -58.501878],
    },
    heading: 180,
    fuel_cut_off: false,
    contact_on: true,
    speed: 60,
  },
  metadata: {
    state: {
      mileage: {
        timestamp: 1494416254,
      },
      location: {
        timestamp: 1494421572,
      },
      heading: {
        timestamp: 1494421572,
      },
      fuel_cut_off: {
        timestamp: 1494413022,
      },
      speed: {
        timestamp: 1494413022,
      },
      contact_on: {
        timestamp: 1494413022,
      },
    },
    info: {
      label: {
        timestamp: 1494435652,
      },
      color: {
        timestamp: 1494463265,
      },
      domain: {
        timestamp: 1494459655,
      },
      make: {
        timestamp: 1494436320,
      },
      model: {
        timestamp: 1495420235,
      },
      year: {
        timestamp: 1494596531,
      },
    },
  },
  actions: ['fuel_cut_off', 'fuel_restore'],
  agents: ['mrn:agent_type:speed_limit', 'mrn:agent_type:parking_mode', 'mrn:agent_type:geofence'],
};

describe('things saga', () => {
  it('should call get of thing, if vehicle get trips and dispatch refresh thing action', () => {
    const id = 'mrn:thing:3d43db1a-2bd9-45f9-a8ad-607e28161afa';
    const expectedThing = {
      id,
      zoom: 16,
      name: 'mi ford azul',
      actions: ['fuel_cut_off', 'fuel_restore'],
      type: CardType.Vehicle,
      agents: ['speed_limit', 'parking_mode', 'geofence'],
      lastUpdated: '18/1/1970',
      speed: 60,
      mileage: 23000,
      contact_on: true,
      center: { lat: -34.570255, lng: -58.501878 },
      trips: [],
      fuelCutOff: false,
      originalType: 'mrn:things:vehicle',
      createdTimestamp: 1494416254,
      location: 'Calle Falsa 123',
      subtype: 'car',
    };

    const action = { type: REFRESH_THING, thingId: id };
    testSaga(refreshThing, action)
      .next()
      .call(thingsService.get, id)
      .next(testThing)
      .call(thingsService.getTrips, id)
      .next([])
      .call([geocodeService, 'getLocation'], { lat: -34.570255, lng: -58.501878 })
      .next({ results: [{ formatted_address: 'Calle Falsa 123, Springfield, USA' }] })
      .put({ type: REFRESH_THING_SUCCESS, mappedThing: expectedThing })
      .next()
      .isDone();
  });
});
