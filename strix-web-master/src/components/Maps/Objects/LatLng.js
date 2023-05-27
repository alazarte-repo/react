class LatLng {
  constructor(latitude = 0, longitude = 0) {
    Object.defineProperties(this, {
      latitude: {
        value: latitude,
        writable: false,
      },
      longitude: {
        value: longitude,
        writable: false,
      },
    });
  }
}

export default LatLng;
