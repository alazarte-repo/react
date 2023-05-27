/* eslint-disable no-undef */
import { Mutex } from 'async-mutex';

class GeocodingService {
  constructor() {
    this._geocoder = null;
    this.cachedRequests = {};
    this.lastRequest = Date.now();
    this.mutex = new Mutex();
    this.max_break_time = 20000;
  }

  static _getLatLongKey({ lat, lng }) {
    return `[${lat},${lng}]`;
  }

  get geocoder() {
    if (this._geocoder == null) {
      this._geocoder = new google.maps.Geocoder();
    }

    return this._geocoder;
  }

  getLocation(latlng, waitDelay = 0, breakTime = 1000) {
    return new Promise(async (resolve, reject) => {
      if (breakTime > this.max_break_time) {
        reject();
      } else {
        const release = await this.mutex.acquire();
        const latLongKey = GeocodingService._getLatLongKey(latlng);
        if (latLongKey in this.cachedRequests) {
          resolve({ results: this.cachedRequests[latLongKey] });
          release();
        } else {
          // We make sure we wait at least 'waitBetweenRequest' milliseconds to do another request
          // due to google geocode requests per second limitation.
          const timeDifference = Date.now() - this.lastRequest;
          const waitTime = timeDifference > waitDelay ? 0 : waitDelay - timeDifference;
          setTimeout(() => this.geocoder.geocode({ location: latlng }, (results, status) => {
            this.lastRequest = Date.now();
            release();
            switch (status) {
              case google.maps.GeocoderStatus.OK:
                this.cachedRequests[latLongKey] = results;
                resolve({ results });
                break;
              case google.maps.GeocoderStatus.ZERO_RESULTS:
                resolve({ results: [] });
                break;
              // If we reach the query limit because we are doing multiple requests per second
              // we take an incremental break to retry
              case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                setTimeout(() => (
                  this.getLocation(latlng, waitDelay, breakTime * 1.5)
                    .then(response => resolve(response))
                    .catch(error => reject(`Geocoder failed due to: ${error}`))
                ), breakTime);
                break;
              default:
                reject(`Geocoder failed due to: ${status}`);
                break;
            }
          }), waitTime);
        }
      }
    });
  }
}

const geocodingService = new GeocodingService();
export default geocodingService;
