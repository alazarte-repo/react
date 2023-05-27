import geocodingService from '../services/geocode';

export function reverseGeocode(latlng, waitBetweenRequest = 0) {
  return geocodingService.getLocation(latlng, waitBetweenRequest).then((response) => {
    if (response.results.length > 0) {
      return response.results[0];
    }

    return null;
  });
}

export default reverseGeocode;
