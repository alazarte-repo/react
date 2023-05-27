/* eslint-env jasmine */

import { fromJS } from 'immutable';
import thirdPartyServicesReducer from './thirdPartyServices';
import ServiceStatus from '../constants/thirdPartyServiceStatus';
import {
  SOLIDMATION_LOGIN,
  SOLIDMATION_LOGIN_FAILED,
  SOLIDMATION_LOGIN_SUCCESS,
  SOLIDMATION_GET_STATUS,
  SOLIDMATION_GET_STATUS_LOGGED,
  SOLIDMATION_GET_STATUS_NOTLOGGED,
  SOLIDMATION_UNLINK_ACCOUNT,
  SOLIDMATION_UNLINK_ACCOUNT_SUCCESS,
  SOLIDMATION_SYNC_HOMES,
  SOLIDMATION_SYNC_HOMES_SUCCESS,
  SOLIDMATION_PAIR_HOMES,
  SOLIDMATION_PAIR_HOMES_SUCCESS,
  SOLIDMATION_LIST_HOMES_SUCCESS,
} from '../constants';

const statusMock = {
  homeList: {
    magenta_homes: [
      {
        id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
        label: 'Mi Casa Magenta 1',
      },
    ],
    solidmation_homes: [
      {
        id: 1234,
        label: 'Mi Casa Solidmation 1',
      },
    ],
    pairings: [
      {
        magenta_home: {
          id: 'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e',
          label: 'mi Casa',
        },
        solidmation_home: {
          id: 5678,
          label: 'Mi Casa Solidmation 2',
        },
      },
    ],
  },
  username: 'mockuser@example.com',
};

const UnpairedHomesMock = {
  magenta_homes: [
    {
      id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
      label: 'Mi Casa Magenta 1',
    },
  ],
  pairings: [],
  solidmation_homes: [
    {
      id: 1234,
      label: 'Mi Casa Solidmation 1',
    },
  ],
};

const PairedHomesMock = {
  homeList: {
    magenta_homes: [],
    solidmation_homes: [],
    pairings: [
      {
        magenta_home: {
          id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
          label: 'Mi Casa Magenta 1',
        },
        solidmation_home: {
          id: 1234,
          label: 'Mi Casa Solidmation 1',
        },
      },
    ],
  },
  pairedHomeInfo: {
    id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
    label: 'Mi Casa Magenta 1',
    children: [
      {
        label: 'Mocked Light',
        type: 'mrn:things:light',
        id: 'mrn:thing:light:05f9843c-bf63-4034-a8f9-a03b130221ba',
        parent_id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
        online: 'online',
        on: false,
        switching: false,
      },
      {
        label: 'Mocked SmartSocket',
        type: 'mrn:things:smart_socket',
        id: 'mrn:thing:smart_socket:c6346069-0266-489d-93cd-e0ab5a70a0f9',
        parent_id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
        online: 'online',
        on: true,
        switching: false,
      },
    ],
  },
};

describe('Third party services reducer', () => {
  it('should return the initial state', () => {
    expect(thirdPartyServicesReducer(undefined, {}).toJS()).toEqual(
      {
        solidmation: {
          status: ServiceStatus.Unknown,
          username: null,
          errorMessage: null,
          list: {},
          homeDetail: null,
        },
      },
    );
  });

  it('SOLIDMATION: should set LoggingIn status when login sucess', () => {
    const action = { type: SOLIDMATION_LOGIN };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.LoggingIn);
  });

  it('SOLIDMATION: should delete error message when logging in', () => {
    const message = 'Testing error message';
    let action = { type: SOLIDMATION_LOGIN_FAILED, message };
    const prevState = thirdPartyServicesReducer(undefined, action);
    action = { type: SOLIDMATION_LOGIN };

    const newState = thirdPartyServicesReducer(prevState, action);

    expect(newState.getIn(['solidmation', 'errorMessage'])).toBeNull();
  });

  it('SOLIDMATION: should set an error message when login fails', () => {
    const message = 'Testing error message';
    const action = { type: SOLIDMATION_LOGIN_FAILED, message };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'errorMessage'])).toEqual(message);
  });

  it('SOLIDMATION: should set RecentLogin status when login sucess', () => {
    const action = { type: SOLIDMATION_LOGIN_SUCCESS };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.RecentLogin);
  });

  it('SOLIDMATION: should set Working status when unlinking account', () => {
    const action = { type: SOLIDMATION_UNLINK_ACCOUNT };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Working);
  });

  it('SOLIDMATION: should set Working status when synchronizing homes', () => {
    const action = { type: SOLIDMATION_SYNC_HOMES };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Working);
  });

  it('SOLIDMATION: should set Working status when pairing', () => {
    const action = { type: SOLIDMATION_PAIR_HOMES };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Working);
  });

  it('SOLIDMATION: should set Working status when gettis solidmation status', () => {
    const action = { type: SOLIDMATION_GET_STATUS };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Working);
  });

  it('SOLIDMATION: should set NotLogged status when account is not logged in', () => {
    const action = { type: SOLIDMATION_GET_STATUS_NOTLOGGED };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.NotLogged);
  });

  it('SOLIDMATION: should set NotLogged status when unlink account success', () => {
    const action = { type: SOLIDMATION_UNLINK_ACCOUNT_SUCCESS };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.NotLogged);
  });

  it('SOLIDMATION: should setup information when logged', () => {
    const action = { type: SOLIDMATION_GET_STATUS_LOGGED, ...statusMock };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Logged);
    expect(newState.getIn(['solidmation', 'username'])).toEqual(statusMock.username);
    expect(newState.getIn(['solidmation', 'list'])).toEqual(fromJS(statusMock.homeList));
  });

  it('SOLIDMATION: should set Logged status when login success', () => {
    const action = { type: SOLIDMATION_SYNC_HOMES_SUCCESS };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Logged);
  });

  it('SOLIDMATION: should set a new home list', () => {
    const action = { type: SOLIDMATION_LIST_HOMES_SUCCESS, homeList: UnpairedHomesMock };

    const newState = thirdPartyServicesReducer(undefined, action);

    expect(newState.getIn(['solidmation', 'list'])).toEqual(fromJS(UnpairedHomesMock));
  });

  it('SOLIDMATION: should set change home list when pairing success', () => {
    let action = { type: SOLIDMATION_LIST_HOMES_SUCCESS, homeList: UnpairedHomesMock };
    const prevState = thirdPartyServicesReducer(undefined, action);

    action = { type: SOLIDMATION_PAIR_HOMES_SUCCESS, ...PairedHomesMock };
    const newState = thirdPartyServicesReducer(prevState, action);

    expect(newState.getIn(['solidmation', 'status'])).toEqual(ServiceStatus.Logged);
    expect(newState.getIn(['solidmation', 'list'])).toEqual(fromJS(PairedHomesMock.homeList));
    expect(newState.getIn(['solidmation', 'homeDetail'])).toEqual(fromJS(PairedHomesMock.pairedHomeInfo));
  });
});
