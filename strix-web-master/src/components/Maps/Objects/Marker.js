/* eslint-disable no-use-before-define */
import LatLng from './LatLng';

class Marker {
  constructor(builder) {
    Object.defineProperties(this, {
      id: {
        value: builder.id,
        writable: false,
      },
      coordinates: {
        value: builder.coordinates,
        writable: false,
      },
      label: {
        value: builder.label,
        writable: false,
      },
      icon: {
        value: builder.icon,
        writable: false,
      },
      iconSize: {
        value: builder.iconSize,
        writable: false,
      },
      iconAnchor: {
        value: builder.iconAnchor,
        writable: false,
      },
      clickCallback: {
        value: builder.clickCallback,
        writable: false,
      },
    });
  }

  static get Builder() {
    return Builder;
  }
}

class Builder {
  constructor(id, latitude, longitude) {
    this.id = id;
    this.coordinates = new LatLng(latitude, longitude);
  }

  setLabel(val) {
    this.label = val;
    return this;
  }

  setIcon(val) {
    this.icon = val;
    return this;
  }

  setIconSize(width, height) {
    this.iconSize = { width, height };
    return this;
  }

  setIconAnchor(x, y) {
    this.iconAnchor = { x, y };
    return this;
  }

  setClickCallback(val) {
    this.clickCallback = val;
    return this;
  }

  build() {
    return new Marker(this);
  }
}

export default Marker;
