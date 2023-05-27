// Dashboard
export const dashboardUrl = '/dashboard';
export const thingsUrl = `${dashboardUrl}/things`;
export const singleThingUrl = `${thingsUrl}/:thingId`;
export const tripUrl = `${singleThingUrl}/trips/:tripId`;
export const singleThingServiceUrl = `${singleThingUrl}/services`;
export const serviceHistoryUrl = `${singleThingServiceUrl}/history`;
export const serviceRegisterUrl = `${singleThingServiceUrl}/register`;
export const configurationUrl = '/configuration';
export const thingsConfigurationUrl = `${configurationUrl}/things/:thingId`;
export const configurationGeofencesUrl = '/configuration/geofences';
export const configurationNewGeofenceUrl = `${configurationGeofencesUrl}/new`;


// Notifications
export const notificationsUrl = '/notifications';

export const notificationIdUrl = `${notificationsUrl}/:notificationId`;

function compile(url) {
  return params =>
    Object.keys(params).reduce(
      (compiledUrl, key) => compiledUrl.replace(`:${key}`, params[key]),
      url,
    );
}

// Compiled urls
const compiledSingleThingUrl = compile(singleThingUrl);
const compiledTripUrl = compile(tripUrl);
const compiledSingleThingServiceUrl = compile(singleThingServiceUrl);
const compiledServiceHistoryUrl = compile(serviceHistoryUrl);
const compiledServiceRegisterUrl = compile(serviceRegisterUrl);
const compiledThingsConfigUrl = compile(thingsConfigurationUrl);
const compiledNotificationIdUrl = compile(notificationIdUrl);

// ===========================================
//                URL Getters
// ===========================================

// Notifications
export const getNotificationIdUrl = notificationId =>
  compiledNotificationIdUrl({ notificationId });

// Things
function getThingConfigurationUrl(thingId) {
  return compiledThingsConfigUrl({ thingId });
}
function getSingleThingUrl(thingId) {
  return compiledSingleThingUrl({ thingId });
}

function getTripUrl(thingId, tripId) {
  return compiledTripUrl({ thingId, tripId });
}
function getSingleThingServiceUrl(thingId) {
  return compiledSingleThingServiceUrl({ thingId });
}

function getServiceHistoryUrl(thingId) {
  return compiledServiceHistoryUrl({ thingId });
}

function getServiceRegisterUrl(thingId) {
  return compiledServiceRegisterUrl({ thingId });
}

function getGeofencesConfigurationUrl() {
  return configurationGeofencesUrl;
}

function getNewGeofenceUrl() {
  return configurationNewGeofenceUrl;
}

function urlMatch(url) {
  return (match, location) => location.pathname === url;
}

export default {
  urlMatch,
  getSingleThingUrl,
  getTripUrl,
  getSingleThingServiceUrl,
  getServiceHistoryUrl,
  getServiceRegisterUrl,
  getGeofencesConfigurationUrl,
  getNewGeofenceUrl,
  getThingConfigurationUrl,
};

export {
  urlMatch,
  getSingleThingUrl,
  getTripUrl,
  getSingleThingServiceUrl,
  getServiceHistoryUrl,
  getServiceRegisterUrl,
  getGeofencesConfigurationUrl,
  getNewGeofenceUrl,
  getThingConfigurationUrl,
};
