/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import sharedLocationReducer from './sharedLocations';
import CardType from '../constants/cardType';
import {
  UPDATE_SHARED_LOCATIONS_SUCCESS,
  REMOVE_SHARED_LOCATION,
} from '../constants';

describe('SharedLocation reducer', () => {
  let state;

  beforeEach(() => {
    state = sharedLocationReducer(undefined, {});
  });

  it('should initialize', () => {
    const expectedState = fromJS({
      type: CardType.Location,
      list: [],
    });

    const newState = sharedLocationReducer(undefined, {});

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should update shared locations', () => {
    const action = {
      type: UPDATE_SHARED_LOCATIONS_SUCCESS,
      list: [{
        user_id: '1',
        center: { lat: -34.6034983, lng: -58.3815 },
        location: 'Av. Corrientes 1048-1080',
        parseTime: '17/05/2018',
      }],
    };

    const newState = sharedLocationReducer(state, action);
    const expectedState = fromJS({
      type: 'Location',
      list: [{
        user_id: '1',
        center: { lat: -34.6034983, lng: -58.3815 },
        location: 'Av. Corrientes 1048-1080',
        parseTime: '17/05/2018',
      }],
    });

    expect(newState).toEqual(expectedState);
  });

  it('should delete shared location', () => {
    const USER_ID = '1';
    const prevAction = {
      type: UPDATE_SHARED_LOCATIONS_SUCCESS,
      list: [{
        user_id: USER_ID,
        center: { lat: -34.6034983, lng: -58.3815 },
        location: 'Av. Corrientes 1048-1080',
        parseTime: '17/05/2018',
      }],
    };
    const action = { type: REMOVE_SHARED_LOCATION, userId: USER_ID };
    const actualState = sharedLocationReducer(undefined, prevAction);

    const newState = sharedLocationReducer(actualState, action);

    expect(newState.get('list').filter(x => x.get('user_id') === 1).size).toEqual(0);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = sharedLocationReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
