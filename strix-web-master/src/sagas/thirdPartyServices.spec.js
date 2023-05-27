/* eslint-env jasmine */

import { testSaga } from 'redux-saga-test-plan';
import thirdPartyServices from '../services/thirdPartyServices';
import HomeControlOrigin from '../constants/homeControlOrigin';
import {
  solidmationListHomes,
  solidmationLogin,
  solidmationGetStatus,
  solidmationUnlinkAccount,
  solidmationSyncHomes,
  solidmationPairHomes,
} from './thirdPartyServices';
import {
  SOLIDMATION_LOGIN,
  SOLIDMATION_LOGIN_SUCCESS,
  SOLIDMATION_LOGIN_FAILED,
  SOLIDMATION_GET_STATUS,
  SOLIDMATION_GET_STATUS_LOGGED,
  SOLIDMATION_GET_STATUS_NOTLOGGED,
  SOLIDMATION_UNLINK_ACCOUNT,
  SOLIDMATION_UNLINK_ACCOUNT_SUCCESS,
  SOLIDMATION_SYNC_HOMES,
  SOLIDMATION_SYNC_HOMES_SUCCESS,
  SOLIDMATION_PAIR_HOMES,
  SOLIDMATION_PAIR_HOMES_SUCCESS,
  SOLIDMATION_LIST_HOMES,
  SOLIDMATION_LIST_HOMES_SUCCESS,
  UPDATE_THINGS,
  UPDATE_HOME_CONTROL_THINGS_SUCCESS,
  HOME_CONTROL_SET_FIRSTLOAD,
} from '../constants';

const homeList = {
  magenta_homes: [
    {
      account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
      actions: [],
      agents: [
        'mrn:agent_type:alarm_set_off',
      ],
      config: {},
      created_by: 'w27dj7hrytmqajuanmbx66zqnxg6mk5s',
      created_timestamp: 1527882377853,
      id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      info: {
        address: {
          address_line1: 'San Martin 123',
          address_line2: 'Piso 2 Dto B',
          city: 'Buenos Aires',
          country: 'Argentina',
          postal_code: '1000',
          state: 'Buenos Aires',
        },
        label: 'mi Casa',
        location: {
          accuracy: [
            10.01,
            0.02,
          ],
          coordinates: [
            -34.614754,
            0,
            0,
          ],
          type: 'Point',
        },
      },
      last_modified_by: 'magenta_internal',
      last_modified_timestamp: 1534435442530,
      metadata: {
        info: {
          address: {
            timestamp: 1527882377854,
          },
          label: {
            timestamp: 1527882377854,
          },
          location: {
            timestamp: 1527882377854,
          },
        },
        state: {},
      },
      parent_id: null,
      state: {},
      things: [
        'mrn:thing:alarm_panel:ed5050u-15209305',
      ],
      type: 'mrn:things:home',
    },
  ],
  pairings: [],
  solidmation_homes: [
    {
      Description: 'LoJack',
      HomeID: 18423,
      InvitedBy: null,
      IsDefault: true,
      IsOnline: true,
      IsOwner: true,
      Location: {
        CityName: null,
        CountryName: null,
        Latitude: null,
        Longitude: null,
        Radius: 500,
        StateName: null,
      },
      RemoteAccessKey: 'SDMIDVRTB5831DC69786',
      TimeZoneID: 1,
      TimeZoneOffset: -180,
      Virtual: true,
      Weather: {
        Temperature: null,
      },
    },
  ],
};

const processedHomeList = {
  magenta_homes: [
    {
      id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      label: 'mi Casa',
      origin: HomeControlOrigin.Magenta,
    },
  ],
  solidmation_homes: [
    {
      id: 18423,
      label: 'LoJack',
      origin: HomeControlOrigin.Solidmation,
    },
  ],
  pairings: [],
};

const pairedHomes = {
  magenta_homes: [],
  pairings: [
    {
      magenta_home: {
        account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
        actions: [],
        agents: [
          'mrn:agent_type:alarm_set_off',
        ],
        config: {
          solidmation: {
            external_id: '18423',
          },
        },
        created_by: 'w27dj7hrytmqajuanmbx66zqnxg6mk5s',
        created_timestamp: 1527882377853,
        id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
        info: {
          address: {
            address_line1: 'San Martin 123',
            address_line2: 'Piso 2 Dto B',
            city: 'Buenos Aires',
            country: 'Argentina',
            postal_code: '1000',
            state: 'Buenos Aires',
          },
          label: 'mi Casa',
          location: {
            accuracy: [
              10.01,
              0.02,
            ],
            coordinates: [
              -34.614754,
              0,
              0,
            ],
            type: 'Point',
          },
        },
        last_modified_by: 'magenta_internal',
        last_modified_timestamp: 1534438936564,
        metadata: {
          info: {
            address: {
              timestamp: 1527882377854,
            },
            label: {
              timestamp: 1527882377854,
            },
            location: {
              timestamp: 1527882377854,
            },
          },
          state: {},
        },
        parent_id: null,
        state: {},
        things: [
          'mrn:thing:light:87caca4d-ded0-44f0-9c4f-0f482844b1b1',
          'mrn:thing:smart_socket:5dfc913f-16b9-45c6-8a39-3c0f220753ab',
        ],
        type: 'mrn:things:home',
      },
      solidmation_home: {
        Description: 'LoJack',
        HomeID: 18423,
        InvitedBy: null,
        IsDefault: true,
        IsOnline: true,
        IsOwner: true,
        Location: {
          CityName: null,
          CountryName: null,
          Latitude: null,
          Longitude: null,
          Radius: 500,
          StateName: null,
        },
        RemoteAccessKey: 'SDMIDVRTB9421DC69786',
        TimeZoneID: 1,
        TimeZoneOffset: -180,
        Virtual: true,
        Weather: {
          Temperature: null,
        },
      },
    },
  ],
  solidmation_homes: [],
};

const pairedHomeInfoChildren = [
  {
    label: 'Naranja',
    type: 'mrn:things:light',
    id: 'mrn:thing:light:87caca4d-ded0-44f0-9c4f-0f482844b1b1',
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    online: 'online',
    on: true,
    switching: false,
  },
  {
    label: 'Enchufe',
    type: 'mrn:things:smart_socket',
    id: 'mrn:thing:smart_socket:5dfc913f-16b9-45c6-8a39-3c0f220753ab',
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    online: 'online',
    on: true,
    switching: false,
  },
];

const EMAIL = 'username@solidamtion.com';
const PASSWORD = '12345';

describe('thirdPartyServices saga', () => {
  it('should list solidmation\'s homes', () => {
    const action = { type: SOLIDMATION_LIST_HOMES };
    testSaga(solidmationListHomes, action)
      .next()
      .call(thirdPartyServices.getSolidmationListHome)
      .next(homeList)
      .put({
        type: SOLIDMATION_LIST_HOMES_SUCCESS,
        homeList: processedHomeList,
      })
      .next()
      .isDone();
  });

  it('should do login to solidmation account', () => {
    const action = {
      type: SOLIDMATION_LOGIN,
      email: EMAIL,
      password: PASSWORD,
    };
    testSaga(solidmationLogin, action)
      .next()
      .call(thirdPartyServices.solidmationLogin, action.email, action.password)
      .next()
      .next() // delay
      .put({ type: SOLIDMATION_LIST_HOMES })
      .next()
      .take(SOLIDMATION_LIST_HOMES_SUCCESS)
      .next()
      .put({ type: SOLIDMATION_LOGIN_SUCCESS })
      .next()
      .isDone();
  });

  it('should notify user or password is wrong', () => {
    const action = {
      type: SOLIDMATION_LOGIN,
      email: EMAIL,
      password: PASSWORD,
    };
    const _error = new Error('Invalid username or password');
    _error.request = { status: 400 };
    testSaga(solidmationLogin, action)
      .next()
      .call(thirdPartyServices.solidmationLogin, action.email, action.password)
      .next()
      .throw(_error)
      .put({
        type: SOLIDMATION_LOGIN_FAILED,
        message: 'Email o contraseña inválidos',
      })
      .next()
      .isDone();
  });

  it('should throw if error is not status code 400 (login)', () => {
    const action = {
      type: SOLIDMATION_LOGIN,
      email: EMAIL,
      password: PASSWORD,
    };
    const _error = new Error('Error');
    try {
      testSaga(solidmationLogin, action)
        .next()
        .call(thirdPartyServices.solidmationLogin, action.email, action.password)
        .next()
        .throw(_error);
    } catch (error) {
      expect(error).toEqual(_error);
    }
  });

  it('should get solidmation account status', () => {
    const action = { type: SOLIDMATION_GET_STATUS };
    const statusResponse = {
      username: EMAIL,
    };
    testSaga(solidmationGetStatus, action)
      .next()
      .call(thirdPartyServices.solidmationGetStatus)
      .next(statusResponse)
      .call(thirdPartyServices.getSolidmationListHome)
      .next(homeList)
      .put({
        type: SOLIDMATION_GET_STATUS_LOGGED,
        homeList: processedHomeList,
        username: statusResponse.username,
      })
      .next()
      .isDone();
  });

  it('should notify user is not logged to solidmation (getStatus)', () => {
    const action = { type: SOLIDMATION_GET_STATUS };
    const _error = new Error('Not found');
    _error.request = { status: 404 };
    testSaga(solidmationGetStatus, action)
      .next()
      .call(thirdPartyServices.solidmationGetStatus)
      .throw(_error)
      .put({ type: SOLIDMATION_GET_STATUS_NOTLOGGED })
      .next()
      .isDone();
  });

  it('should throw if getStatus fails and status code is not 404', () => {
    const action = { type: SOLIDMATION_GET_STATUS };
    const _error = new Error('Not found');
    try {
      testSaga(solidmationGetStatus, action)
        .next()
        .call(thirdPartyServices.solidmationGetStatus)
        .throw(_error);
    } catch (error) {
      expect(error).toEqual(_error);
    }
  });

  it('should unlink solidmation account', () => {
    const action = { type: SOLIDMATION_UNLINK_ACCOUNT };
    testSaga(solidmationUnlinkAccount, action)
      .next()
      .call(thirdPartyServices.solidmationUnlinkAccount)
      .next()
      .put({ type: SOLIDMATION_UNLINK_ACCOUNT_SUCCESS })
      .next()
      .isDone();
  });

  it('should sync solidmations homes', () => {
    const action = { type: SOLIDMATION_SYNC_HOMES };
    testSaga(solidmationSyncHomes, action)
      .next()
      .call(thirdPartyServices.solidmationSyncHomes)
      .next()
      .put({ type: HOME_CONTROL_SET_FIRSTLOAD })
      .next()
      .put({ type: SOLIDMATION_SYNC_HOMES_SUCCESS })
      .next()
      .isDone();
  });

  it('should pair homes', () => {
    const action = {
      type: SOLIDMATION_PAIR_HOMES,
      magentaHome: processedHomeList.magenta_homes[0],
      solidmationHome: processedHomeList.magenta_homes[0],
    };
    const processedPairedHome = {
      magenta_homes: [],
      solidmation_homes: [],
      pairings: [
        {
          magenta_home: {
            id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
            label: 'mi Casa',
            origin: HomeControlOrigin.Magenta,
          },
          solidmation_home: {
            id: 18423,
            label: 'LoJack',
            origin: HomeControlOrigin.Solidmation,
          },
        },
      ],
    };

    testSaga(solidmationPairHomes, action)
      .next()
      .call(
        thirdPartyServices.solidmationPairHomes,
        action.magentaHome.id,
        action.solidmationHome.id,
      )
      .next()
      .next() // delay
      .put({ type: UPDATE_THINGS })
      .next()
      .take(UPDATE_HOME_CONTROL_THINGS_SUCCESS)
      .next()
      .call(thirdPartyServices.getSolidmationListHome)
      .next(pairedHomes)
      // select TODO: Should define function inside select in selector's section
      .next(pairedHomeInfoChildren)
      .put({
        type: SOLIDMATION_PAIR_HOMES_SUCCESS,
        homeList: processedPairedHome,
        pairedHomeInfo: {
          id: action.magentaHome.id,
          label: action.magentaHome.label,
          children: pairedHomeInfoChildren,
        },
      })
      .next()
      .isDone();
  });
});
