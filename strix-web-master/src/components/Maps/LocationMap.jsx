import React from 'react';
import { GoogleMap, Marker, withGoogleMap, Polyline } from 'react-google-maps';
import PropTypes from 'prop-types';
import { createBounds } from 'utils/map';

class LocationMap extends React.Component {
    componentDidMount = () => {
      this.props.selectLocation(this.props.locations, this.props.selectedDate);
    }

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.selectedLocation.date !== this.props.selectedLocation.date) {
        const polylinePath = nextProps.selectedLocation.polylinePath || [];

        if (polylinePath.length > 0) {
          this.fitBounds(polylinePath);
        }
      }
      if (nextProps.selectedDate !== this.props.selectedDate) {
        this.props.selectLocation(nextProps.locations, nextProps.selectedDate);
      }
    }

    componentWillUnmount = () => {
      this.props.resetLocation();
    }


    getPolyline = () => {
      const pattern = {
        path: 'M 0,1 0,1',
        strokeOpacity: 1,
        scale: 3,
      };

      const polylinePath = this.props.selectedLocation.polylinePath || [];
      return (
        <Polyline
          path={polylinePath}
          geodesic
          options={{
            strokeColor: '#ff2527',
            strokeOpacity: 0.0,
            strokeWeight: 2,
            icons: [{
              icon: pattern,
              offset: '0',
              repeat: '5px',
            }],
          }}
        />
      );
    }

    getMarkers = () => {
      const markers = this.props.selectedLocation.markers || [];

      return markers.map(marker =>
        (<Marker
          key={marker.key}
          icon={{
            url: '/img/polyline-end.png',
            scaledSize: new window.google.maps.Size(15, 15),
            anchor: new window.google.maps.Point(7.5, 7.5),
          }}
          {...marker}
        />),

      );
    }

    fitBounds = (polylinePath) => {
      const bounds = createBounds(polylinePath);
      if (this.map) this.map.fitBounds(bounds);
    };

    render() {
      return (
        <div className="map">
          <GoogleMap
            defaultCenter={{ lat: 36.05298765935, lng: -112.083756616339 }}
            defaultZoom={17}
            ref={(node) => { this.map = node; }}
            defaultOptions={{ maxZoom: 18, zoom: 17 }}
            onZoomChanged={() => {}}
          >
            { this.getPolyline()}
            { this.getMarkers() }
          </GoogleMap>
        </div>
      );
    }
}

LocationMap.propTypes = {
  locations: PropTypes.array,
  selectedLocation: PropTypes.object,
  selectLocation: PropTypes.func,
  selectedDate: PropTypes.string,
  resetLocation: PropTypes.func,
};

const HOCMap = withGoogleMap(LocationMap);

export default props =>
  (<HOCMap
    {...props}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  />);
