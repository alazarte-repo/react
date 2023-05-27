import CardType from '../constants/cardType';
import { VehicleSubtype } from '../constants/thingType';

const { LatLng, LatLngBounds } = window.google.maps;

export function createBounds(centersList = []) {
  const latLngList = centersList.map(center => new LatLng(center.lat, center.lng));
  const bounds = new LatLngBounds();
  latLngList.forEach(bound => bounds.extend(bound));
  return bounds;
}

export function createBoundsFromCircles(circles) {
  const bounds = new LatLngBounds();
  circles.forEach(circle => bounds.union(circle.getBounds()));
  return bounds;
}

export function extendBounds(boundsList) {
  const bounds = new LatLngBounds();
  boundsList.forEach(bound => bounds.union(bound));
  return bounds;
}

export function markerIconVehicle(subtype) {
  switch (subtype) {
    case VehicleSubtype.Motorcycle:
      return '/img/pin-moto.png';
    case VehicleSubtype.Car:
      return '/img/pin-car.png';
    default:
      return '/img/pin-car.png';
  }
}

export function markerIconUrl(type, subtype) {
  switch (type) {
    case CardType.Home:
      return '/img/pin-home.png';
    case CardType.Flex:
      return '/img/pin-flex.png';
    case CardType.Location:
      return '/img/pin-location.png';
    case CardType.Vehicle:
      return markerIconVehicle(subtype);
    default:
      return '/img/pin-car.png';
  }
}

export function markerColorUrl(marker, selectedThingId) {
  const markerUrl = markerIconUrl(marker.type, marker.subtype);
  if (selectedThingId === '-1' || marker.thingId === selectedThingId) {
    return markerUrl;
  }
  if (marker.thingId !== selectedThingId) {
    return `${markerUrl.split('.')[0]}-grey.png`;
  }
  return markerUrl;
}

export default {
  createBounds,
  createBoundsFromCircles,
  extendBounds,
  markerIconUrl,
  markerColorUrl,
  markerIconVehicle,
};
