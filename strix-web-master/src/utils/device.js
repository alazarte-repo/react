function isInTheString(string, toBeSearch) {
  return string.includes(toBeSearch);
}

function getBrowserName() {
  const { userAgent } = navigator;
  if (isInTheString(userAgent, 'Chrome')) return 'Chrome';
  if (isInTheString(userAgent, 'Firefox')) return 'FireFox';
  if (isInTheString(userAgent, 'Chromium')) return 'Chromium';
  if (isInTheString(userAgent, 'Safari')) return 'Safari';
  if (isInTheString(userAgent, 'Opera') || isInTheString(userAgent, 'OPR')) return 'Safari';
  if (isInTheString(userAgent, 'MSIE')) return 'Internet Explorer o EDGE';
  return 'Unknow';
}

function randomStringGeneretor() {
  return `${Math.random().toString(16)}000000000`.substr(2, 8);
}

function compileOctet(isIt) {
  return isIt
    ? `-${randomStringGeneretor().substr(0, 4)}-${randomStringGeneretor().substr(4, 4)}`
    : randomStringGeneretor();
}

function compileUUID(type) {
  const deviceUUID = localStorage.getItem(type);
  if (!deviceUUID) {
    const setDeviceUUID = compileOctet() + compileOctet(true) + compileOctet(true) + compileOctet();
    localStorage.setItem(type, setDeviceUUID);
    return setDeviceUUID;
  }
  return deviceUUID;
}

export { getBrowserName };

export default {
  name: getBrowserName(),
  make: navigator.vendor,
  model: navigator.appVersion,
  system_name: navigator.platform,
  system_version: navigator.platform,
  identifier: compileUUID('DEVICE_IDENTIFIER'),
  token: compileUUID('DEVICE_TOKEN'),
  app_installation_id: 'none',
  push_notifications_enabled: false,
  app_version_id: 'none',
};
