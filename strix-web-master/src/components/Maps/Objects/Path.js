/* eslint-disable no-use-before-define */
import LatLng from './LatLng';

class Path {
  constructor(builder) {
    Object.defineProperties(this, {
      start: {
        value: new LatLng(builder.startLatitude, builder.startLongitude),
        writable: false,
      },
      end: {
        value: new LatLng(builder.endLatitude, builder.endLongitude),
        writable: false,
      },
      path: {
        value: builder.path,
        writable: false,
      },
      dashed: {
        value: builder.dashed,
        writable: false,
      },
      id: {
        value: builder.id,
        writable: false,
      },
      iconStart: {
        value: builder.iconStart,
        writable: false,
      },
      iconEnd: {
        value: builder.iconEnd,
        writable: false,
      },
      color: {
        value: builder.color,
        writable: false,
      },
    });
  }

  static get Builder() {
    return Builder;
  }
}

class Builder {
  constructor(id, startLatitude, startLongitude, endLatitude, endLongitude) {
    this.id = id;
    this.startLatitude = startLatitude;
    this.startLongitude = startLongitude;
    this.endLatitude = endLatitude;
    this.endLongitude = endLongitude;
  }

  setPath(val) {
    this.path = val;
    return this;
  }

  setDashed(val) {
    this.dashed = val;
    return this;
  }

  setIconStart(val) {
    this.iconStart = val;
    return this;
  }

  setIconEnd(val) {
    this.iconEnd = val;
    return this;
  }

  setColor(val) {
    this.color = val;
    return this;
  }

  build() {
    return new Path(this);
  }
}

export default Path;
