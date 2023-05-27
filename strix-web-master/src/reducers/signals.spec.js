/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import signalsReducer from './signals';
import {
  GET_SIGNALS_SUCCESS,
} from '../constants';

const newSignals = [
  {
    cmd_status: 'finished',
    cmd_timestamp: 1534868080735,
    event: 'response',
    event_timestamp: 1534868086418,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-123456789123456',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
  },
  {
    cmd_status: 'finished',
    cmd_timestamp: 1534868060701,
    event: 'response',
    event_timestamp: 1534868060863,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-123456789123456',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'disarmed',
    zones: '2222222222222222',
  },
];


describe('signals reducer', () => {
  let state;

  beforeEach(() => {
    state = signalsReducer(undefined, {});
  });


  it('should initialize', () => {
    const expectedState = fromJS({
      list: [],
    });

    const newState = signalsReducer(undefined, {});

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should add signals to list', () => {
    const action = { type: GET_SIGNALS_SUCCESS, signals: newSignals };
    const expectedState = fromJS({
      list: newSignals,
    });

    const newState = signalsReducer(state, action);

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = signalsReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});

