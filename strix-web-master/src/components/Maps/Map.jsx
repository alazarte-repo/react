import React from 'react';
import { Circle, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import PropTypes from 'prop-types';
import {
  createBounds,
  createBoundsFromCircles,
  extendBounds,
  markerColorUrl,
} from 'utils/map';


class DefaultMap extends React.Component {
  componentDidMount = () => {
    this.onThingSelected();
  };

  componentWillReceiveProps = () => {
    this.circles = {};
  };

  componentDidUpdate = () => {
    this.onThingSelected();
  };
  onThingSelected = () => {
    if (this.props.selectedThingId !== '-1') {
      const selectedMarker = this.props.markers
        .filter(marker => this.props.selectedThingId === marker.thingId);
      this.fitBounds(selectedMarker, this.props.geofences);
    } else {
      this.fitBounds(this.props.markers, this.props.geofences);
    }
  };
  circles = {};

  fitBounds = (markers) => {
    const markersCenters = markers.map(marker => marker.position);
    const markersBounds = createBounds(markersCenters);
    const circlesList = Object.keys(this.circles)
      .map(key => this.circles[key])
      .filter(circle => circle);
    const circlesBounds = createBoundsFromCircles(circlesList);
    const bounds = extendBounds([markersBounds, circlesBounds]);

    if (this.map) this.map.fitBounds(bounds);
  };

  geofenceCircle() {
    return (this.props.geofences.map(geofence => (
      <Circle
        key={geofence.marker.key}
        radius={Number(geofence.radius)}
        center={geofence.coordinates}
        ref={(node) => { this.circles[geofence.marker.key] = node; }}
        options={{
          fillColor: '#80fa05',
          fillOpacity: 0.20,
          strokeColor: 'green',
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    ),
    ));
  }

  render() {
    return (
      <div className="map">
        <GoogleMap
          defaultCenter={{ lat: -34.6080556, lng: -58.3724665 }} // FIXME si no hay default center
          defaultZoom={17} // FIXME o zoom rompe cuando se cierra la agenda de servicios
          ref={(node) => { this.map = node; }}
          defaultOptions={{ maxZoom: 17 }}
        >
          {this.props.geofences && this.geofenceCircle()}
          {(this.props.markers).map(marker =>
            (<Marker
              key={marker.key}
              icon={{
                url: markerColorUrl(marker, this.props.selectedThingId),
                scaledSize: new window.google.maps.Size(40, 50),
              }}
              onClick={() => this.props.selectCard(marker.thingId)}
              {...marker}
            />))}
        </GoogleMap>
      </div>
    );
  }
}

DefaultMap.propTypes = {
  markers: PropTypes.array,
  geofences: PropTypes.array,
  selectedThingId: PropTypes.string,
  selectCard: PropTypes.func,
};

DefaultMap.defaultProps = {
  markers: [],
  geofences: [],
};

const HOCMap = withGoogleMap(DefaultMap);

export default props =>
  (<HOCMap
    {...props}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  />);
