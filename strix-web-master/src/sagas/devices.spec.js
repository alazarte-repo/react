/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { getDevices, revokeDevice } from './devices';
import { devices } from '../services';
import { GET_DEVICES_SUCCESS, REVOKE_DEVICE_SUCCESS } from '../constants';

describe('devices saga test', () => {
  it('should get device data', () => {
    const deviceList = [
      { account_id: '1',
        created_by: 'user_1',
        id: 'device1',
        model: 'iphone',
        name: 'Rick',
        system_name: 'iOS',
      },
      {
        account_id: '2',
        created_by: 'user_2',
        id: 'device2',
        model: 'Macintosh 5.0',
        name: 'Chrome',
        system_name: 'MacIntel',
      },
    ];
    testSaga(getDevices)
      .next()
      .call(devices.get)
      .next(deviceList)
      .put({ type: GET_DEVICES_SUCCESS, deviceList })
      .next()
      .isDone();
  });

  it('should remove a device', () => {
    const action = { deviceId: 'mrn:device:FE856' };
    testSaga(revokeDevice, action)
      .next()
      .call(devices.deleteDevice, action.deviceId)
      .next()
      .put({ type: REVOKE_DEVICE_SUCCESS, deviceId: action.deviceId })
      .next()
      .isDone();
  });
});
