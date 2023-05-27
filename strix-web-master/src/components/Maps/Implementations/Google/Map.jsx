/* eslint-disable react/no-multi-comp */

import React, { Component, forwardRef } from 'react';
import {
  GoogleMap,
  withGoogleMap,
} from 'react-google-maps';
import PropTypes from 'prop-types';
import {
  Marker,
  Geofence,
  LatLng,
  Path,
} from '../../Objects';
import {
  Geofence as GeofenceComponent,
  Marker as MarkerComponent,
  Path as PathComponent,
} from './MapComponents';

// TODO: Make a proper import!
const { LatLngBounds } = window.google.maps;


class DefaultMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: -34.6083,
      lng: -58.3712,
      zoom: 13,
    };

    this.map = null;
    this.geofenceReferences = {};
    this.markersReferences = {};
    this.pathReferences = {};

    // Bindings
    this._getMarkerComponent = this._getMarkerComponent.bind(this);
    this._getGeofenceComponent = this._getGeofenceComponent.bind(this);
    this._getPathComponent = this._getPathComponent.bind(this);
    this.onLoadFinished = this.onLoadFinished.bind(this);
    this.onChangeZoom = this.onChangeZoom.bind(this);
  }

  componentDidMount() {
    this._fitBounds();
  }

  componentWillUpdate() {
    this.geofenceReferences = {};
    this.markersReferences = {};
    this.pathReferences = {};
  }

  onLoadFinished() {
    if (this.props.onLoadFinished != null) {
      this.props.onLoadFinished();
    }
  }

  onChangeZoom() {
    if (this.props.onChangeZoom != null && this.map != null) {
      this.props.onChangeZoom(this.map.getZoom());
    }
  }

  getBounds() {
    return this.map != null ? this.map.getBounds() : null;
  }

  getBoundsCenter() {
    if (this.map == null) {
      return null;
    }
    const center = this.map.getBounds().getCenter();
    return new LatLng(center.lat(), center.lng());
  }

  _fitBounds = () => {
    const bounds = new LatLngBounds();
    this.props.objectsToFit.forEach((objectId) => {
      if (objectId in this.geofenceReferences) {
        bounds.union(this.geofenceReferences[objectId].mapsElement.getBounds());
      } else if (objectId in this.pathReferences) {
        bounds.union(this.pathReferences[objectId].getBounds());
      } else if (objectId in this.markersReferences) {
        bounds.extend(this.markersReferences[objectId].mapsElement.getPosition());
      }
    });

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
    }
  }

  _getMarkerComponent = marker => (
    <MarkerComponent
      key={marker.id}
      ref={(c) => { this.markersReferences[marker.id] = c; }}
      coordinates={marker.coordinates}
      icon={marker.icon}
      iconSize={marker.iconSize}
      label={marker.label}
      onClick={marker.clickCallback}
    />
  )

  _getGeofenceComponent = geofence => (
    <GeofenceComponent
      id={geofence.id}
      key={geofence.id}
      ref={(c) => { this.geofenceReferences[geofence.id] = c; }}
      latitude={geofence.coordinates.latitude}
      longitude={geofence.coordinates.longitude}
      radius={geofence.radius}
      label={geofence.label}
      editable={geofence.editable}
      fillColor={geofence.fillColor}
      borderColor={geofence.borderColor}
      onCenterChanged={geofence.onCenterChanged}
      onRadiusChanged={geofence.onRadiusChanged}
      onClick={geofence.onClick}
    />
  );

  _getPathComponent = path => (
    <PathComponent
      id={path.id}
      key={path.id}
      ref={(c) => { this.pathReferences[path.id] = c; }}
      start={path.start}
      end={path.end}
      path={path.path}
      dashed={path.dashed}
      iconStart={path.iconStart}
      iconEnd={path.iconEnd}
      color={path.color}
    />
  )

  render() {
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        ref={(node) => { this.map = node; }}
        onTilesLoaded={this.onLoadFinished}
        onZoomChanged={this.onChangeZoom}
      >
        {
          this.props.markers.map(this._getMarkerComponent)
        }
        {
          this.props.geofences.map(this._getGeofenceComponent)
        }
        {
          this.props.paths.map(this._getPathComponent)
        }
        {
          this.props.genericObjects
        }
      </GoogleMap>
    );
  }
}

DefaultMap.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.instanceOf(Marker)),
  geofences: PropTypes.arrayOf(PropTypes.instanceOf(Geofence)),
  paths: PropTypes.arrayOf(PropTypes.instanceOf(Path)),
  genericObjects: PropTypes.array,
  objectsToFit: PropTypes.array,
  zoom: PropTypes.number,
  center: PropTypes.object,
  onLoadFinished: PropTypes.func,
  onChangeZoom: PropTypes.func,
};

DefaultMap.defaultProps = {
  markers: [],
  geofences: [],
  paths: [],
  genericObjects: [],
  objectsToFit: [],
  zoom: 17,
  center: { lat: -34.6080556, lng: -58.3724665 },
};

class HOCMap extends Component {
  constructor(props) {
    super(props);
    this._withGoogleMaps = withGoogleMap(p => <DefaultMap {...p} ref={props.forwardedRef} />);
  }

  render() {
    const WithGoogleMaps = this._withGoogleMaps;
    return (
      <WithGoogleMaps
        {...this.props}
        containerElement={<div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
        mapElement={<div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
      />
    );
  }
}

HOCMap.propTypes = {
  forwardedRef: PropTypes.object,
};

export default forwardRef((props, ref) => <HOCMap {...props} forwardedRef={ref} />);
