/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import camerasReducer from './cameras';
import {
  GET_CAMERAS,
  GET_CAMERAS_SUCCESS,
  DELETE_CAMERA_SUCCESS,
  UPDATE_CAMERA_SUCCESS,
} from '../constants';

const cameraId = 'mrn:thing:camera:e05af96b-2d6e-432c-93d0-064364bf57b5';
const cameraId2 = 'mrn:thing:camera:e05af96b-2d6e-432c-45ae-ba34bd23f984';

const camerasMocks = [
  {
    id: cameraId,
    label: 'Test',
    urls: {
      live_preview_url: 'https://openapi-alpha-usa01.ivideon.com/cameras/200-lvV5TcHRUFJ9hCA6oiga2C:0/live_preview?access_token=200-U1cc2ae90-fedc-4143-9418-a5ef231fb31b',
      live_stream_hls_url: 'https://openapi-alpha-usa01.ivideon.com/cameras/200-lvV5TcHRUFJ9hCA6oiga2C:0/live_stream?access_token=200-U1cc2ae90-fedc-4143-9418-a5ef231fb31b&format=hls&q=0',
    },
    preview: 'Base64Preview',
    status: 'online',
  },
  {
    id: cameraId2,
    label: 'Test',
    urls: {
      live_preview_url: 'https://openapi-alpha-usa01.ivideon.com/cameras/200-lvV5TcHRUFJ9hCA6oiga2C:0/live_preview?access_token=200-U1cc2ae90-fedc-4143-9418-a5ef231fb31b',
      live_stream_hls_url: 'https://openapi-alpha-usa01.ivideon.com/cameras/200-lvV5TcHRUFJ9hCA6oiga2C:0/live_stream?access_token=200-U1cc2ae90-fedc-4143-9418-a5ef231fb31b&format=hls&q=0',
    },
    preview: 'Base64Preview',
    status: 'offline',
  },
];

describe('cameras reducer', () => {
  let state;

  beforeEach(() => {
    state = camerasReducer(undefined, {});
  });

  it('should initialize', () => {
    const expectedState = fromJS({
      list: [],
      firstLoad: true,
    });

    const newState = camerasReducer(undefined, {});

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should setup placeholders', () => {
    const action = {
      type: GET_CAMERAS,
      cameras: [cameraId, cameraId2],
    };

    const newState = camerasReducer(state, action);
    const expectedState = fromJS({
      list: [
        {
          id: cameraId,
          label: 'Cargando...',
          preview: null,
          status: 'loading',
          urls: {
            live_preview_url: null,
            live_stream_hls_url: null,
          },
        },
        {
          id: cameraId2,
          label: 'Cargando...',
          preview: null,
          status: 'loading',
          urls: {
            live_preview_url: null,
            live_stream_hls_url: null,
          },
        },
      ],
      firstLoad: false,
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should not change anything if its not first load', () => {
    const action = {
      type: GET_CAMERAS,
      cameras: [cameraId, cameraId2],
    };
    const actualState = fromJS({
      list: [],
      firstLoad: false,
    });

    const newState = camerasReducer(actualState, action);

    expect(actualState).toBe(newState);
  });

  it('should save cameras', () => {
    const action = {
      type: GET_CAMERAS_SUCCESS,
      cameras: camerasMocks,
    };

    const newState = camerasReducer(state, action);
    const expectedState = fromJS({
      list: camerasMocks,
      // firstLoad is true because GET_CAMERAS is the one who
      // changes it to false, reducer must change the list only
      firstLoad: true,
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should delete cameras', () => {
    const action = {
      type: DELETE_CAMERA_SUCCESS,
      cameraId,
    };
    const actualState = fromJS({
      list: camerasMocks,
      firstLoad: true,
    });

    const newState = camerasReducer(actualState, action);
    const expectedState = fromJS({
      list: camerasMocks.filter(x => x.id !== cameraId),
      // firstLoad is true because GET_CAMERAS is the one who
      // changes it to false, reducer must change the list only
      firstLoad: true,
    });

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should update camera', () => {
    const updatedCamera = {
      id: 'mrn:thing:camera:e05af96b-2d6e-432c-93d0-064364bf57b5',
      info: { label: 'Edited Label' },
    };

    const action = {
      type: UPDATE_CAMERA_SUCCESS,
      camera: updatedCamera,
    };
    const actualState = fromJS({
      list: camerasMocks,
      // firstLoad is true because GET_CAMERAS is the one who
      // changes it to false, reducer must change the list only
      firstLoad: true,
    });

    const newState = camerasReducer(actualState, action);
    const newCamerasMock = camerasMocks.slice(0);
    newCamerasMock[0].label = updatedCamera.info.label;
    const expectedState = fromJS({
      list: newCamerasMock,
      firstLoad: true,
    });

    expect(newState).toEqual(expectedState);
  });

  it('should return old state if modified camera id not found', () => {
    const updatedCamera = {
      id: 'non_existant_id',
      info: { label: 'Edited Label' },
    };

    const action = {
      type: UPDATE_CAMERA_SUCCESS,
      camera: updatedCamera,
    };
    const actualState = fromJS({
      list: camerasMocks,
      // firstLoad is true because GET_CAMERAS is the one who
      // changes it to false, reducer must change the list only
      firstLoad: true,
    });

    const newState = camerasReducer(actualState, action);

    expect(newState).toBe(actualState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = camerasReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});

