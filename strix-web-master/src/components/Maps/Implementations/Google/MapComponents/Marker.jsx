/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker as GoogleMarker } from 'react-google-maps';
import { LatLng } from '../../../Objects';

class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: undefined,
    };
    this.mapsElement = null;
  }

  componentWillMount() {
    this.setState({ icon: this._getIcon() });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.icon != nextProps.icon || this.props.iconSize != nextProps.iconSize) {
      this.setState({ icon: this._getIcon() });
    }
  }

  _getIcon() {
    let icon;
    if (this.props.icon != null) {
      icon = {
        url: this.props.icon,
        scaledSize: this.props.iconSize != null
          ? new window.google.maps.Size(this.props.iconSize.width, this.props.iconSize.height)
          : undefined,
      };
    }
    return icon;
  }

  render() {
    return (
      <GoogleMarker
        ref={(c) => { this.mapsElement = c; }}
        position={{
          lat: this.props.coordinates.latitude,
          lng: this.props.coordinates.longitude,
        }}
        icon={this.state.icon}
        onClick={this.props.clickCallback}
        label={this.props.label}
      />
    );
  }
}

Marker.propTypes = {
  coordinates: PropTypes.instanceOf(LatLng),
  label: PropTypes.string,
  icon: PropTypes.string,
  // TODO: Create a Size object!
  iconSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  // iconAnchor: PropTypes.string,
  clickCallback: PropTypes.func,
};

export default Marker;
