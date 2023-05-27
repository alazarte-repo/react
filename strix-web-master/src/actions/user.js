import {
  GET_USER_DATA,
  LOGOUT_REQUEST,
  GET_DEVICES,
  CHANGE_PASSWORD,
  REVOKE_DEVICE,
  CHANGE_PIN,
  RESET_ACTION_STATUS,
} from '../constants';

export const getUserData = () => ({
  type: GET_USER_DATA,
});

export const requestLogout = () => ({
  type: LOGOUT_REQUEST,
});

export const getDevices = () => ({
  type: GET_DEVICES,
});

export const revoqueDevice = deviceId => ({
  type: REVOKE_DEVICE,
  deviceId,
});

export const getUserSuccessful = () => ({
  type: 'GET_USER_DATA_SUCCESSFUL',
});

export const changePassword = body => ({
  type: CHANGE_PASSWORD,
  body,
});

export const changePin = pin => ({
  type: CHANGE_PIN,
  pin,
});

export const resetActionStatus = () => ({
  type: RESET_ACTION_STATUS,
});
