/* eslint-env jasmine */
import { call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { homeServices } from '../services';
import {
  getSignals,
  modifyCamera,
  deleteCamera,
  getCameras,
} from './homeSaga';
import {
  GET_SIGNALS,
  GET_SIGNALS_SUCCESS,
  GET_CAMERAS,
  GET_CAMERAS_SUCCESS,
  UPDATE_CAMERA,
  UPDATE_CAMERA_SUCCESS,
  DELETE_CAMERA,
  DELETE_CAMERA_SUCCESS,
  REFRESH_THING,
} from '../constants';


const CAMERA_ID = 1;
const THING_ID = 1;

const CAMERAS = [
  'mrn:thing:camera:e05af96b-2d6e-432c-93d0-064364bf57b5',
  'mrn:thing:camera:e05af96b-2d6e-432c-93d0-2384af463b23',
];

const NEW_LABEL = 'New Label';

const camerasRespose = [
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    actions: [],
    agents: [],
    created_by: 'magenta_internal',
    created_timestamp: 1525985970569,
    id: 'mrn:thing:camera:e05af96b-2d6e-432c-93d0-064364bf57b5',
    includes: {
      live_preview_url: 'https://openapi-alpha-usa01.ivideon.com/cameras/200-lvV5TcHRUFJ9hCA6oiga2C:0/live_preview?access_token=200-U45ee2921-64f9-44a9-9da4-4cb5d548cfef',
      live_stream_hls_url: 'https://usa602.extcam.com/hls/live?access_token=200-U_censored_8cfef&vcodec=h264&ts=1530712845.84&server=200-lvV5TcHRUFJ9hCA6oiga2C&q=0&camera=0&streams=both&duration=0&u=200001091867&acodec=aac&token=59bd3f0fac036ffba47a10acb3b54df9',
    },
    info: {
      external_id: '200-lvV5TcHRUFJ9hCA6oiga2C:0',
      label: 'Prueba2',
      provider: 'mrn:provider:ivideon',
      type: 'embedded',
    },
    last_modified_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    last_modified_timestamp: 1527521958127,
    metadata: {
      info: {
        external_id: {
          timestamp: 1525985970569,
        },
        label: {
          timestamp: 1527521958121,
        },
        provider: {
          timestamp: 1525985970569,
        },
        type: {
          timestamp: 1525985970569,
        },
      },
      state: {
        first_online: {
          timestamp: 1525985970569,
        },
        last_offline: {
          timestamp: 1525985970569,
        },
        last_online: {
          timestamp: 1525985970569,
        },
        online: {
          timestamp: 1525985970569,
        },
      },
    },
    parent_id: 'mrn:thing:home:6e93037b-4885-4208-b1f0-ec29956c396c',
    state: {
      first_online: 1525985969018,
      last_offline: 0,
      last_online: 1525985969018,
      online: true,
    },
    things: [],
    type: 'mrn:things:camera',
  },
  {
    account_id: 'mrn:account:2f4f3b7d-91fc-42ef-8de7-51031c369694',
    actions: [],
    agents: [],
    created_by: 'magenta_internal',
    created_timestamp: 1525985970569,
    id: 'mrn:thing:camera:e05af96b-2d6e-432c-93d0-2384af463b23',
    includes: {
      live_preview_url: 'https://openapi-alpha-usa01.ivideon.com/cameras/200-lvV5TcHRUFJ9hCA6oiga2C:0/live_preview?access_token=200-U45ee2921-64f9-44a9-9da4-4cb5d548cfef',
      live_stream_hls_url: 'https://usa602.extcam.com/hls/live?access_token=200-U_censored_8cfef&vcodec=h264&ts=1530712845.84&server=200-lvV5TcHRUFJ9hCA6oiga2C&q=0&camera=0&streams=both&duration=0&u=200001091867&acodec=aac&token=59bd3f0fac036ffba47a10acb3b54df9',
    },
    info: {
      external_id: '200-lvV5TcHRUFJ9hCA6oiga2C:0',
      label: 'Prueba2',
      provider: 'mrn:provider:ivideon',
      type: 'embedded',
    },
    last_modified_by: 'mrn:user:738d3f41-04d4-47f8-9b35-8c10984e4062',
    last_modified_timestamp: 1527521958127,
    metadata: {
      info: {
        external_id: {
          timestamp: 1525985970569,
        },
        label: {
          timestamp: 1527521958121,
        },
        provider: {
          timestamp: 1525985970569,
        },
        type: {
          timestamp: 1525985970569,
        },
      },
      state: {
        first_online: {
          timestamp: 1525985970569,
        },
        last_offline: {
          timestamp: 1525985970569,
        },
        last_online: {
          timestamp: 1525985970569,
        },
        online: {
          timestamp: 1525985970569,
        },
      },
    },
    parent_id: 'mrn:thing:home:6e93037b-4885-4208-b1f0-ec29956c396c',
    state: {
      first_online: 1525985969018,
      last_offline: 0,
      last_online: 1525985969018,
      online: true,
    },
    things: [],
    type: 'mrn:things:camera',
  },
];

const signalsResponse = [
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526746140393,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'connect',
    event_timestamp: 1526738104405,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526736509066,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'connect',
    event_timestamp: 1526735553146,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526733148965,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'connect',
    event_timestamp: 1526732216105,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526729848996,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
  },
];

const processedSignalsResponse = [
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526746140393,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
    label: 'Sin conexión',
    icon: 'blocked',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'connect',
    event_timestamp: 1526738104405,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
    label: 'Conexión',
    icon: 'alarm-on',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526736509066,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
    label: 'Sin conexión',
    icon: 'blocked',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'connect',
    event_timestamp: 1526735553146,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
    label: 'Conexión',
    icon: 'alarm-on',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526733148965,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
    label: 'Sin conexión',
    icon: 'blocked',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'connect',
    event_timestamp: 1526732216105,
    firmware: '01a',
    hardware: '01',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '01',
    pin: '',
    protocol: 'ed5050u',
    status: 'armed',
    zones: '2222222222222222',
    label: 'Conexión',
    icon: 'alarm-on',
  },
  {
    cmd_status: null,
    cmd_timestamp: null,
    event: 'disconnect',
    event_timestamp: 1526729848996,
    firmware: '',
    hardware: '',
    original_thing_id: 'mrn:thing:alarm_panel:ed5050u-989898989898900',
    partition: '',
    pin: '',
    protocol: 'ed5050u',
    status: 'unknown',
    zones: null,
    label: 'Sin conexión',
    icon: 'blocked',
  },
];


describe('homeSaga saga test', () => {
  it('should get and format signals', () => {
    const action = { type: GET_SIGNALS, thingId: THING_ID };
    testSaga(getSignals, action)
      .next()
      .call(homeServices.get, action.thingId)
      .next(signalsResponse)
      .put({ type: GET_SIGNALS_SUCCESS, signals: processedSignalsResponse })
      .next()
      .isDone();
  });


  it('should delete camera', () => {
    const action = { type: DELETE_CAMERA, cameraId: CAMERA_ID, thingId: THING_ID };
    testSaga(deleteCamera, action)
      .next()
      .call(homeServices.remove, action.cameraId)
      .next()
      .put({ type: DELETE_CAMERA_SUCCESS, cameraId: action.cameraId })
      .next()
      .put({ type: REFRESH_THING, thingId: action.thingId })
      .next()
      .isDone();
  });

  it('should get cameras', () => {
    // FIXME: 'serializeCamera' in yield all returns nothing
    const action = { type: GET_CAMERAS, cameras: CAMERAS };
    testSaga(getCameras, action)
      .next()
      .all([
        call(homeServices.getCameras, action.cameras[0]),
        call(homeServices.getCameras, action.cameras[1]),
      ])
      .next(camerasRespose)
      .next()
      .put({ type: GET_CAMERAS_SUCCESS, cameras: undefined })
      .next()
      .isDone();
  });

  it('should update cameras', () => {
    const action = {
      type: UPDATE_CAMERA,
      body: {
        cameraId: CAMERAS[0],
        label: NEW_LABEL,
      },
    };

    const updateBody = [
      {
        action: 'update',
        value: action.body.label,
        path: '/label',
      },
    ];

    const modifyResponse = Object.assign(camerasRespose[0], { info: { label: NEW_LABEL } });
    testSaga(modifyCamera, action)
      .next()
      .call(homeServices.patch, action.body.cameraId, updateBody)
      .next(modifyResponse)
      .put({ type: UPDATE_CAMERA_SUCCESS, camera: modifyResponse })
      .next()
      .isDone();
  });
});
