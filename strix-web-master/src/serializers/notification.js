import DateTimeUtils from '../utils/DateTimeUtils';
import { markerIconVehicle } from '../utils/map';
import { getVehicleIconClass } from '../utils/things';
import { ThingTypeSingular } from '../constants/thingType';
import NotificationDetailType from '../constants/notificationDetailType';

// Cache things for faster retrieval
let cachedThings = {};
let thingsSize = 0;

// --------------------
//  Thing info getters
// --------------------

function getThing(thingId, things) {
  if (things == null) {
    return null;
  }

  if (things.size !== thingsSize) {
    cachedThings = {};
    thingsSize = things.size;
  }

  if (thingId in cachedThings) {
    return cachedThings[thingId];
  }

  const thing = things.find(x => x.get('id') === thingId);
  cachedThings[thingId] = thing != null ? thing : null;
  return cachedThings[thingId];
}

function getThingType(notification) {
  try {
    const thingId = notification.event.details.thing_id;
    if (thingId != null) {
      const thingType = thingId.split(':');
      return `${thingType[0]}:${thingType[1]}:${thingType[2]}`;
    }
  } catch (error) {
    return null;
  }

  return null;
}

// ----------------------
//  Event detail getters
// ----------------------

function locationDetail({ event }, things) {
  const thing = getThing(event.details.thing_id, things);
  const subtype = thing != null ? thing.get('subtype') : null;

  return {
    speed: event.details.speed,
    location: {
      lat: event.details.location.coordinates[0],
      lng: event.details.location.coordinates[1],
    },
    markerIcon: markerIconVehicle(subtype),
  };
}

function linkDetail({ event }) {
  return { url: event.details.url };
}

function getEventDetail(detailType, notification, things) {
  switch (detailType) {
    case NotificationDetailType.WithLocation:
      return locationDetail(notification, things);
    case NotificationDetailType.WithLink:
      return linkDetail(notification);
    default:
      return null;
  }
}

function getNotificationDetailType(notification) {
  if (notification.event != null &&
      notification.event.details != null &&
      notification.event.details.location != null) {
    return NotificationDetailType.WithLocation;
  }
  if (notification.event != null &&
    notification.event.details != null &&
    notification.event.details.url != null) {
    return NotificationDetailType.WithLink;
  }

  return NotificationDetailType.Generic;
}

// ---------------
//  Icons getters
// ---------------

function vehicleIcon({ event }, things) {
  const thing = getThing(event.details.thing_id, things);
  const subtype = thing != null ? thing.get('subtype') : null;
  return getVehicleIconClass(subtype);
}

function getNotificationIcon(notification, things) {
  const thingType = getThingType(notification);

  switch (thingType) {
    case ThingTypeSingular.Vehicle:
      return vehicleIcon(notification, things);
    case ThingTypeSingular.Flex:
      return 'icon-service-flex';
    case ThingTypeSingular.Home:
      return 'icon-service-home';
    default:
      return 'icon-email';
  }
}

// Main function
function serializeNotification(notification, things) {
  const detailType = getNotificationDetailType(notification);
  return {
    id: notification.id,
    eventType: notification.event_type,
    detailType,
    icon: getNotificationIcon(notification, things),
    subject: notification.subject,
    body: notification.body ? notification.body.plain : notification.subject,
    timestamp: notification.timestamp,
    humanizedTimestamp: DateTimeUtils.timestampHumanizer(notification.timestamp),
    date: DateTimeUtils.timestampToFullDate(notification.timestamp),
    eventDetail: getEventDetail(detailType, notification, things),
    read: notification.read,
  };
}

export default serializeNotification;
