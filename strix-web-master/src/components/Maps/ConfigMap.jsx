import React from 'react';
import { Circle, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import PropTypes from 'prop-types';
import { createBoundsFromCircles } from 'utils/map';


class Map extends React.Component {
  componentDidMount = () => {
    this.fitBounds();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.geofences !== this.props.geofences) this.fitBounds();
  };

  circles = {};

  fitBounds = () => {
    const circlesList = Object.keys(this.circles)
      .map(key => this.circles[key])
      .filter(circle => circle);
    const bounds = createBoundsFromCircles(circlesList);
    if (this.map) this.map.fitBounds(bounds);
  };

  renderGeofences = geofences =>
    geofences.map(geofence => (
      <Circle
        key={geofence.marker.key}
        ref={(node) => { this.circles[geofence.marker.key] = node; }}
        radius={Number(geofence.radius)}
        center={geofence.coordinates}
        options={{
          fillColor: geofence.marker.key === this.props.highlightedGeofence ? 'green' : 'grey',
          fillOpacity: 0.20,
          strokeColor: geofence.marker.key === this.props.highlightedGeofence ? 'green' : 'grey',
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
        onClick={() => this.props.onGeofenceClick(geofence.marker.key)}
      />
    ));

  renderLabels = geofences =>
    geofences.map(geofence => (
      <Marker
        key={`${geofence.marker.key}-label`}
        position={geofence.coordinates}
        label={geofence.label}
        icon={{
          path: 'M2 2 H 55 V 25 H 2 L 2 2',
          fillColor: 'red',
          fillOpacity: 0,
          strokeColor: '#000',
          strokeWeight: 0,
        }}
      />
    ));

  render() {
    return (
      <GoogleMap
        defaultZoom={17}
        ref={(node) => { this.map = node; }}
        defaultOptions={{ maxZoom: 17 }}
      >
        { this.renderGeofences(this.props.geofences) }
        { this.renderLabels(this.props.geofences) }
      </GoogleMap>
    );
  }
}


Map.propTypes = {
  geofences: PropTypes.array,
  onGeofenceClick: PropTypes.func,
  highlightedGeofence: PropTypes.string,
};


Map.defaultProps = {
  geofences: [],
};

export default withGoogleMap(Map);
