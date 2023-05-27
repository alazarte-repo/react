import googleApiService from '../services/geocode';
import DateTimeUtils from './DateTimeUtils';
import CardType from '../constants/cardType';


function validateThing(type) {
  return type === CardType.Vehicle || type === CardType.Flex;
}

function filterThings(things) {
  return things.filter(thing => validateThing(thing.type));
}

export function returnPromiseArr(things, service) {
  return filterThings(things).map(thing => service.getTrips(thing.id));
}

export const TripsSagaUtils = {
  getAddress: (_trip, waitBetweenRequest = 0) => {
    const obj = {
      lat: _trip.location.coordinates[0],
      lng: _trip.location.coordinates[1],
    };
    return googleApiService.getLocation(obj, waitBetweenRequest).then((response) => {
      if (response.results.length > 0) {
        const rawAddressResponse = response.results[0].formatted_address;
        return rawAddressResponse.slice(0, rawAddressResponse.indexOf(','));
      }

      return 'Ubicación desconocida';
    });
  },
};

export function getPolylinePath(path) {
  return path.map(point =>
    Object.assign(
      {},
      {
        lat: point.location.coordinates[0],
        lng: point.location.coordinates[1],
      },
      { parsedDatetime: DateTimeUtils.timestampToHourMinutes(point.datetime) },
      { ...point },
    ),
  );
}

export default {
  TripsSagaUtils,
  returnPromiseArr,
  getPolylinePath,
};
