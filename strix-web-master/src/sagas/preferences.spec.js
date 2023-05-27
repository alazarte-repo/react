/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import {
  GET_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCES_SUCCESS,
  SUCCESS,
} from '../constants';
import preferencesService from '../services/preferences';
import { getPreferences, modifyPreferences } from './preferences';

describe('preferences saga tests', () => {
  it('should get preferences', () => {
    const action = { thingId: '6578' };
    const preferencesPayload = {
      account_id: 'mrn:account:b',
      'com.magenta.events.alarm_set_off': 'push',
      created_by: 'mrn:user:713',
      created_timestamp: '1524752196680',
      id: 'mrn:user_preference:61e',
      thing_id: 'mrn:thing:home:d0',
    };

    testSaga(getPreferences, action)
      .next()
      .call(preferencesService.get, '6578')
      .next(preferencesPayload)
      .put({ type: GET_PREFERENCES_SUCCESS, preferences: preferencesPayload, thingId: '6578' })
      .next()
      .isDone();
  });
  it('should modify preferences', () => {
    const action = {
      thingId: '6578',
      values: {
        'com.magenta.events.alarm_set_off': 'alert',
      },
    };

    testSaga(modifyPreferences, action)
      .next()
      .call(preferencesService.put, '6578', { 'com.magenta.events.alarm_set_off': 'alert' })
      .next()
      .put({
        type: UPDATE_PREFERENCES_SUCCESS,
        thingId: '6578',
        values: { 'com.magenta.events.alarm_set_off': 'alert' },
      })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Tus notificaciones han sido modificadas con éxito',
        },
      })
      .next()
      .isDone();
  });
});
