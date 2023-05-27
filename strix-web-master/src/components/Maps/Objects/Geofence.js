/* eslint-disable no-use-before-define */
import LatLng from './LatLng';

class Geofence {
  constructor(builder) {
    Object.defineProperties(this, {
      coordinates: {
        value: builder.coordinates,
        writable: false,
      },
      radius: {
        value: builder.radius,
        writable: false,
      },
      label: {
        value: builder.label,
        writable: false,
      },
      id: {
        value: builder.id,
        writable: false,
      },
      editable: {
        value: builder.editable || false,
        writable: false,
      },
      borderColor: {
        value: builder.borderColor,
        writable: false,
      },
      fillColor: {
        value: builder.fillColor,
        writable: false,
      },
      onCenterChanged: {
        value: builder.onCenterChanged,
        writable: false,
      },
      onRadiusChanged: {
        value: builder.onRadiusChanged,
        writable: false,
      },
      onClick: {
        value: builder.onClick,
        writable: false,
      },
    });
  }

  static get Builder() {
    return Builder;
  }
}

class Builder {
  constructor(id, latitude, longitude, radius) {
    this.id = id;
    this.coordinates = new LatLng(latitude, longitude);
    this.radius = radius;
  }

  setLabel(val) {
    this.label = val;
    return this;
  }

  setEditable(val) {
    this.editable = val;
    return this;
  }

  setBorderColor(val) {
    this.borderColor = val;
    return this;
  }

  setFillColor(val) {
    this.fillColor = val;
    return this;
  }

  setOnCenterChanged(val) {
    this.onCenterChanged = val;
    return this;
  }

  setOnRadiusChanged(val) {
    this.onRadiusChanged = val;
    return this;
  }

  setOnClick(val) {
    this.onClick = val;
    return this;
  }

  build() {
    return new Geofence(this);
  }
}

export default Geofence;
