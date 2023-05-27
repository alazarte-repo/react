/* eslint-disable */
import constants from './constants';

global.constants = constants;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

const googleApiMock = {
  maps: {
    LatLng: jest.fn(),
    LatLngBounds: jest.fn(),
  },
};

global.window.google = googleApiMock;
