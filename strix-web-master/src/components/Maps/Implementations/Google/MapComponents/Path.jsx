/* eslint-disable eqeqeq */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Marker, Polyline } from 'react-google-maps';
import { LatLng } from '../../../Objects';

// TODO: Make a proper import!
const { Size, Point, LatLngBounds } = window.google.maps;
const GoogleLatLng = window.google.maps.LatLng;

class Path extends Component {
  constructor(props) {
    super(props);
    this.mapsElement = null;
  }

  getBounds() {
    const bounds = new LatLngBounds();
    this.props.path.forEach(dot =>
      bounds.extend(new GoogleLatLng(dot.latitude, dot.longitude)),
    );
    return bounds;
  }

  render() {
    return (
      <Fragment>
        <Marker
          icon={{
            url: this.props.iconStart,
            scaledSize: new Size(15, 15),
            anchor: new Point(7.5, 7.5),
          }}
          position={{
            lat: this.props.start.latitude,
            lng: this.props.start.longitude,
          }}
        />
        <Polyline
          ref={(c) => { this.mapsElement = c; }}
          path={this.props.path.map(x => ({ lat: x.latitude, lng: x.longitude }))}
          options={{
            strokeColor: this.props.color,
            strokeOpacity: 0.8,
            strokeWeight: 1,
            icons: [{
              icon: {
                path: 'M 0,1 0,1',
                strokeOpacity: 1,
                scale: 3,
              },
              offset: '0',
              repeat: '5px',
            }],
          }}
        />
        <Marker
          icon={{
            url: this.props.iconEnd,
            scaledSize: new Size(15, 15),
            anchor: new Point(7.5, 7.5),
          }}
          position={{
            lat: this.props.end.latitude,
            lng: this.props.end.longitude,
          }}
        />
      </Fragment>
    );
  }
}

Path.propTypes = {
  start: PropTypes.instanceOf(LatLng),
  end: PropTypes.instanceOf(LatLng),
  path: PropTypes.arrayOf(PropTypes.instanceOf(LatLng)),
  iconStart: PropTypes.string,
  iconEnd: PropTypes.string,
  color: PropTypes.string,
};

export default Path;
