/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { userDataService, accountService } from '../services';
import { getUserData, changePassword, changePin } from './userData';
import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESSFUL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PIN,
  CHANGE_PIN_SUCCESS,
  SUCCESS,
} from '../constants';

const history = require('../store');

const userData = {
  account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
  active: true,
  birthday: '1977-05-30',
  created_by: 'y3gsp7ljqvcwrmyzwvhkuzf3djkkmfy9',
  created_timestamp: 1526566091499,
  first_name: 'John',
  genre: 'M',
  id: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  last_modified_timestamp: 1532617204945,
  last_name: 'Doe',
  middle_name: 'E',
  security_pin: '1234',
  username: 'test@example.com',
};

const accountData = {
  active: true,
  address: {
    address_line1: 'Paraguay 100',
    city: 'Rosario',
    country: 'Argentina',
    postal_code: '2000',
    state: 'Santa Fe',
  },
  country_id: 'AR',
  created_by: 'w27dj7hrytmqajuanmbx66zqnxg6mk5s',
  created_timestamp: 1527882376914,
  emails: [
    {
      email: 'john.doe@gmail.com',
      tag: 'personal',
    },
  ],
  id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
  identification_number: '8587',
  identification_type: 'DNI',
  individual: true,
  last_modified_by: 'w27dj7hrytmqajuanmbx66zqnxg6mk5s',
  last_modified_timestamp: 1527882376914,
  name: 'My Account',
  number: 'AB1234567',
  owner_id: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  phones: [
    {
      number: '+54 9 11 12345678',
      tag: 'mobile',
    },
  ],
  services: {
    'mrn:service:car': {
      description: 'Plan control y seguridad de vehiculo habilitado',
      enabled: true,
      expiry_date: '2017-05-12T00:00:00+00:00',
    },
    'mrn:service:home': {
      description: 'Plan Home habilitado',
      enabled: true,
      expiry_date: '2017-05-12T00:00:00+00:00',
    },
  },
};

const serializedUserData = {
  id: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  accountId: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
  accountType: 'account_admin',
  firstName: 'John',
  middleName: 'E',
  lastName: 'Doe',
  username: 'test@example.com',
  securityPin: '1234',
  identificationType: 'DNI',
  identificationNumber: '8587',
  countryId: 'AR',
};

const accountType = ['resource_owners', 'account_admin'];

describe('userData saga', () => {
  it('should get user data, account type and country', () => {
    const action = { type: GET_USER_DATA };
    testSaga(getUserData, action)
      .next()
      .call(userDataService.get)
      .next(userData)
      .call(accountService.get, userData.account_id)
      .next(accountData)
      .call(userDataService.accType)
      .next(accountType)
      .put({
        type: GET_USER_DATA_SUCCESSFUL,
        userData: serializedUserData,
      })
      .next()
      .isDone();
  });

  it('should change password', () => {
    const body = { old_password: '12345', new_password: '54321' };
    const action = { type: CHANGE_PASSWORD, body };
    testSaga(changePassword, action)
      .next()
      .call(userDataService.changePassword, action.body)
      .next()
      .put({ type: CHANGE_PASSWORD_SUCCESS })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Tu contraseña ha sido cambiada con exito',
        },
      })
      .next()
      .call(history.history.goBack)
      .next()
      .isDone();
  });

  it('should change pin', () => {
    const pin = '4321';
    const action = { type: CHANGE_PIN, pin };
    const body = [{ action: 'update', path: '/security_pin', value: action.pin }];
    const changePinResponse = Object.assign(userData, { security_pin: pin });
    testSaga(changePin, action)
      .next()
      .call(userDataService.changePin, body)
      .next(changePinResponse)
      .put({ type: CHANGE_PIN_SUCCESS, userData: changePinResponse })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Tu PIN ha sido cambiado con exito',
        },
      })
      .next()
      .call(history.history.goBack)
      .next()
      .isDone();
  });
});
