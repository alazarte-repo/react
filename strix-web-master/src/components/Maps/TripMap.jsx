import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import Map from './Implementations';
import { PrimaryColor } from '../../constants/colors';
import { Path, LatLng } from './Objects';

const ARROW_ICON = 'M15.375,7L10,2.54C9.695,2.287,9.461,2,9,2C8.375,2,8,2.516,8,3v3H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h7v3  c0,0.484,0.375,1,1,1c0.461,0,0.695-0.287,1-0.54L15.375,9C15.758,8.688,16,8.445,16,8S15.758,7.313,15.375,7z';

class TripMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
    };

    this.onChangeZoom = this.onChangeZoom.bind(this);
  }

  onChangeZoom(zoom) {
    this.setState({ zoom });
  }

  buildPath() {
    const startMarker = this.props.polylineMarkers.find(x => x.type === 'polyline-start');
    const endMarker = this.props.polylineMarkers.find(x => x.type === 'polyline-end');
    if (startMarker != null && startMarker.position != null
      && endMarker != null && endMarker.position != null) {
      const path = new Path
        .Builder(
          this.props.selectedTripId,
          startMarker.position.lat,
          startMarker.position.lng,
          endMarker.position.lat,
          endMarker.position.lng,
        )
        .setPath(this.props.polylinePath.map(x => new LatLng(x.lat, x.lng)))
        .setDashed(true)
        .setColor(PrimaryColor)
        .setIconStart('/img/polyline-start.png')
        .setIconEnd('/img/polyline-end.png')
        .build();

      return [path];
    }
    return [];
  }

  // TODO - Make a proper abstraction in Map component for Markers with labels
  buildMarkers() {
    return this.props.polylinePath.map((point, index) => (
      <MarkerWithLabel
        // eslint-disable-next-line react/no-array-index-key
        key={`${index}-${point.datetime}`}
        position={{ lat: point.lat, lng: point.lng }}
        labelAnchor={new window.google.maps.Point(70, 0)}
        icon={{
          rotation: point.heading + 270,
          path: ARROW_ICON,
          fillColor: PrimaryColor,
          fillOpacity: 1,
          strokeColor: PrimaryColor,
          strokeWeight: 0.5,
          scale: 2,
        }}
      >
        <div className="tooltip-trips-details" >
          <span>{ point.parsedDatetime }</span>
          <span>{ `${point.speed} Km/h` }</span>
        </div>
      </MarkerWithLabel>
    ));
  }

  render() {
    const paths = this.buildPath();
    const objectsToFit = paths.length !== 0 ? [paths[0].id] : [];
    const informationMarkers = this.state.zoom >= 18 ? this.buildMarkers() : [];
    return (
      <Map
        paths={paths}
        genericObjects={informationMarkers}
        objectsToFit={objectsToFit}
        onChangeZoom={this.onChangeZoom}
      />
    );
  }
}

TripMap.propTypes = {
  polylinePath: PropTypes.array,
  polylineMarkers: PropTypes.array,
  selectedTripId: PropTypes.string,
};

TripMap.defaultProps = {
  polylinePath: [],
  polylineMarkers: [],
};

export default TripMap;

