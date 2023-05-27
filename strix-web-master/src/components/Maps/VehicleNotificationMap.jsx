import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withGoogleMap } from 'react-google-maps';

class VehicleNotificationMap extends React.Component {
  render() {
    return (
      <GoogleMap
        defaultCenter={{ lat: -34.6080556, lng: -58.3724665 }}
        defaultZoom={17}
        ref={(node) => { this.map = node; }}
        center={this.props.location}
        defaultOptions={{ maxZoom: 18, zoom: 17 }}
        onZoomChanged={() => this.handleZoomChange()}
      >
        { this.props.children }
      </GoogleMap>
    );
  }
}

VehicleNotificationMap.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

VehicleNotificationMap.defaultProps = {
  cards: [{ center: {} }],
  markers: [],
  polylinePath: [],
  polylineMarkers: [],
};

const HOCMap = withGoogleMap(VehicleNotificationMap);

export default props =>
  (<HOCMap
    {...props}
    containerElement={<div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
    mapElement={<div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
  />);
