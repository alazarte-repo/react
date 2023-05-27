/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import userDataReducer from './userData';
import { loadingUserCountryInfo } from '../utils/user';
import {
  GET_USER_DATA_SUCCESSFUL,
  GET_DEVICES_SUCCESS,
  REVOKE_DEVICE_SUCCESS,
  GET_FAMILY_USERS_SUCCESS,
  ADD_FAMILY_USER_SUCCESS,
  DELETE_FAMILY_USER_SUCCESS,
  CHANGE_PIN_SUCCESS,
  MODIFY_FAMILY_USER_SUCCESS,
  ADD_FAMILY_USER_ERROR,
  ADD_FAMILY_USER,
  FAMILY_USERS_RESET_ADD_ERROR,
} from '../constants';

const devicesListMock = [
  {
    account_id: 'mrn:account:4de13eef-0594-417d-9794-0288674832d2',
    app_installation_id: 'none',
    app_version_id: 'none',
    created_by: 'mrn:user:81c31ccf-d940-450d-bcf4-d3a625a47eb7',
    created_timestamp: 1534165743696,
    id: 'mrn:device:f53c8f36-b731-23fd-f1a7-20165adf9a09',
    identifier: 'f53c8f36-b731-23fd-f1a7-20165adf9a09',
    last_modified_by: 'mrn:user:81c31ccf-d940-450d-bcf4-d3a625a47eb7',
    last_modified_timestamp: 1534165743696,
    make: 'Google Inc.',
    model: '5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
    name: 'Chrome',
    push_notifications_enabled: false,
    system_name: 'Linux x86_64',
    system_version: 'Linux x86_64',
    token: 'c24fa164-5f2c-3b50-a39f-c5f19f43f39b',
    tracking_enabled: false,
    user_id: 'mrn:user:81c31ccf-d940-450d-bcf4-d3a625a47eb7',
  },
  {
    account_id: 'mrn:account:4de13eef-0594-417d-9794-0288674832d2',
    app_installation_id: 'none',
    app_version_id: 'none',
    created_by: 'mrn:user:81c31ccf-d940-450d-bcf4-d3a625a47eb7',
    created_timestamp: 1533922605273,
    id: 'mrn:device:25e4e08f-addb-4ebd-e666-9ae362e8f57c',
    identifier: '25e4e08f-addb-4ebd-e666-9ae362e8f57c',
    last_modified_by: 'mrn:user:81c31ccf-d940-450d-bcf4-d3a625a47eb7',
    last_modified_timestamp: 1533922605273,
    make: 'Google Inc.',
    model: '5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
    name: 'Chrome',
    push_notifications_enabled: false,
    system_name: 'Linux x86_64',
    system_version: 'Linux x86_64',
    token: 'd60a28ed-3302-a72c-434b-4f21de03111d',
    tracking_enabled: false,
    user_id: 'mrn:user:81c31ccf-d940-450d-bcf4-d3a625a47eb7',
  },
];

const familyUsersMock = [
  {
    account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
    active: true,
    created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    created_timestamp: 1530877739564,
    first_name: 'Test',
    id: 'mrn:user:6b0df968-f08e-4dba-a4f9-101391795810',
    last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    last_modified_timestamp: 1530877739564,
    last_name: 'Test1',
    password: '12345',
    push_notifications_enabled: false,
    security_pin: '1234',
    signup_completed: false,
    username: 'test1@example.com',
  },
  {
    account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
    active: true,
    created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    created_timestamp: 1530814909810,
    first_name: 'Test',
    id: 'mrn:user:74121e52-6d92-4378-a2a9-8989a81164c8',
    last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    last_modified_timestamp: 1530814909810,
    last_name: 'Test2',
    password: '12345',
    push_notifications_enabled: false,
    security_pin: '1234',
    signup_completed: false,
    username: 'test2@example.com',
  },
];

const userDataMock = {
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

describe('UserData reducer', () => {
  let state;

  beforeEach(() => {
    state = userDataReducer(undefined, {});
  });

  it('should take user data', () => {
    const action = {
      type: GET_USER_DATA_SUCCESSFUL,
      userData: userDataMock,
    };
    const newState = userDataReducer(state, action);
    const expectedState = fromJS({
      user: userDataMock,
      devices: [],
      users: [],
      addFamilyUserError: null,
      loadingNewFamilyUser: false,
      countryInfo: {
        customerCarePhone: '0810-77-78749',
        operationsCentrePhone: '0800-333-0911',
      },
    });
    expect(newState).toEqual(expectedState);
  });

  it('should save devices', () => {
    const action = {
      type: GET_DEVICES_SUCCESS,
      deviceList: devicesListMock,
    };

    const newState = userDataReducer(state, action);
    const expectedState = fromJS({
      user: {},
      devices: devicesListMock,
      users: [],
      addFamilyUserError: null,
      loadingNewFamilyUser: false,
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should revoke devices', () => {
    const deviceId = 'mrn:device:f53c8f36-b731-23fd-f1a7-20165adf9a09';
    const action = {
      type: REVOKE_DEVICE_SUCCESS,
      deviceId,
    };
    const actualState = fromJS({
      user: {},
      devices: devicesListMock,
      users: [],
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);
    const expectedState = fromJS({
      user: {},
      devices: devicesListMock.filter(x => x.id !== deviceId),
      users: [],
      countryInfo: loadingUserCountryInfo,
    });


    expect(newState).toEqual(expectedState);
  });

  it('should save family users', () => {
    const action = {
      type: GET_FAMILY_USERS_SUCCESS,
      users: familyUsersMock,
    };

    const newState = userDataReducer(state, action);
    const expectedState = fromJS({
      user: {},
      devices: [],
      users: familyUsersMock,
      addFamilyUserError: null,
      loadingNewFamilyUser: false,
      countryInfo: loadingUserCountryInfo,
    });


    expect(newState).toEqual(expectedState);
  });

  it('should add new family user', () => {
    const newUser = {
      account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
      active: true,
      created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
      created_timestamp: 1530814909810,
      first_name: 'Test',
      id: 'mrn:user:74121e52-6d92-4378-a2a9-8989a81164c8',
      last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
      last_modified_timestamp: 1530814909810,
      last_name: 'Test3',
      password: '12345',
      push_notifications_enabled: false,
      security_pin: '1234',
      signup_completed: false,
      username: 'test3@example.com',
    };
    const action = {
      type: ADD_FAMILY_USER_SUCCESS,
      newUser,
    };

    const actualState = fromJS({
      user: {},
      devices: [],
      users: familyUsersMock,
      addFamilyUserError: null,
      loadingNewFamilyUser: true,
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);
    const expectedState = fromJS({
      user: {},
      devices: [],
      users: familyUsersMock.concat(newUser),
      addFamilyUserError: null,
      loadingNewFamilyUser: false,
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should delete family user', () => {
    const id = 'mrn:user:6b0df968-f08e-4dba-a4f9-101391795810';
    const action = {
      type: DELETE_FAMILY_USER_SUCCESS,
      id,
    };
    const actualState = fromJS({
      user: {},
      devices: [],
      users: familyUsersMock,
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);
    const expectedState = fromJS({
      user: {},
      devices: [],
      users: familyUsersMock.filter(x => x.id !== id),
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should change pin of a user', () => {
    const newUserData = Object.assign({}, userDataMock);
    newUserData.securityPin = '4321';
    const action = {
      type: CHANGE_PIN_SUCCESS,
      userData: newUserData,
    };
    const actualState = fromJS({
      user: userDataMock,
      devices: [],
      users: [],
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);
    const expectedState = fromJS({
      user: newUserData,
      devices: [],
      users: [],
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should modify family user', () => {
    const modifiedUser = Object.create(familyUsersMock[0]);
    modifiedUser.first_name = 'Modify Test';
    const action = {
      type: MODIFY_FAMILY_USER_SUCCESS,
      user: modifiedUser,
    };
    const actualState = fromJS({
      user: {},
      devices: [],
      users: familyUsersMock,
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);
    const newFamilyUsersArray = familyUsersMock.slice(0);
    newFamilyUsersArray[0] = modifiedUser;
    const expectedState = fromJS({
      user: {},
      devices: [],
      users: newFamilyUsersArray,
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should set loading a new family member', () => {
    const action = { type: ADD_FAMILY_USER };
    const newState = userDataReducer(state, action);
    const expectedState = fromJS({
      user: {},
      devices: [],
      users: [],
      addFamilyUserError: null,
      loadingNewFamilyUser: true,
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should set an error when adding family user failed', () => {
    const action = { type: ADD_FAMILY_USER_ERROR, message: 'Error' };
    const actualState = fromJS({
      user: {},
      devices: [],
      users: [],
      addFamilyUserError: null,
      loadingNewFamilyUser: true,
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);

    const expectedState = fromJS({
      user: {},
      devices: [],
      users: [],
      addFamilyUserError: action.message,
      loadingNewFamilyUser: false,
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should reset error message', () => {
    const action = { type: FAMILY_USERS_RESET_ADD_ERROR };
    const actualState = fromJS({
      user: {},
      devices: [],
      users: [],
      addFamilyUserError: 'An error message',
      loadingNewFamilyUser: false,
      countryInfo: loadingUserCountryInfo,
    });

    const newState = userDataReducer(actualState, action);

    const expectedState = fromJS({
      user: {},
      devices: [],
      users: [],
      addFamilyUserError: null,
      loadingNewFamilyUser: false,
      countryInfo: loadingUserCountryInfo,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = userDataReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
