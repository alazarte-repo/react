function setAuthState(state) {
  localStorage.setItem('isAuthenticated', state);
}

function setAuthToken(token, refreshToken) {
  localStorage.setItem('TOKEN', token);
  localStorage.setItem('REFRESH_TOKEN', refreshToken);
  return token ? setAuthState(true) : setAuthState(false);
}

function setDeviceID(id) {
  localStorage.setItem('DEVICE_ID', id);
}

function setLocalStorage(userPayload) {
  setAuthToken(userPayload.access_token, userPayload.refresh_token);
}

export default {
  setLocalStorage,
  setDeviceID,
};
