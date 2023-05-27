import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Circle, Marker } from 'react-google-maps';
import { LatLng } from '../../../Objects';

class Geofence extends Component {
  constructor(props) {
    super(props);
    this.mapsElement = null;

    this.onCenterChanged = this.onCenterChanged.bind(this);
    this.onRadiusChanged = this.onRadiusChanged.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate() {
    if (this.mapsElement != null &&
        this.mapsElement.getEditable() &&
        this.mapsElement.getDraggable()) {
      return false;
    }
    return true;
  }

  onCenterChanged() {
    if (this.props.onCenterChanged == null) {
      return;
    }

    if (this.mapsElement == null) {
      this.props.onCenterChanged(null);
    }

    const center = this.mapsElement.getCenter();
    this.props.onCenterChanged({
      id: this.props.id,
      center: new LatLng(center.lat(), center.lng()),
    });
  }

  onRadiusChanged() {
    if (this.props.onRadiusChanged == null) {
      return;
    }

    if (this.mapsElement == null) {
      this.props.onRadiusChanged(null);
    }

    this.props.onRadiusChanged({
      id: this.props.id,
      radius: this.mapsElement.getRadius(),
    });
  }

  onClick() {
    if (this.props.onClick != null) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    const center = { lat: this.props.latitude, lng: this.props.longitude };
    return (
      <Fragment>
        <Circle
          radius={this.props.radius}
          center={center}
          ref={(node) => { this.mapsElement = node; }}
          editable={this.props.editable}
          draggable={this.props.editable}
          options={{
            fillColor: this.props.fillColor,
            fillOpacity: 0.20,
            strokeColor: this.props.borderColor,
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
          onClick={this.onClick}
          onCenterChanged={this.onCenterChanged}
          onRadiusChanged={this.onRadiusChanged}
        />
        {
          this.props.label != null &&
          <Marker
            position={center}
            label={this.props.label}
            icon={{
              path: 'M2 2 H 55 V 25 H 2 L 2 2',
              strokeColor: '#000',
              strokeWeight: 0,
            }}
          />
        }
      </Fragment>
    );
  }
}

Geofence.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  radius: PropTypes.number,
  fillColor: PropTypes.string,
  borderColor: PropTypes.string,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
  onCenterChanged: PropTypes.func,
  onRadiusChanged: PropTypes.func,
};

export default Geofence;
