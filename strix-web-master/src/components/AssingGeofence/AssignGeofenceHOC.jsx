import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from '../Maps/Objects';
import { markerColorUrl } from '../../utils/map';

function AssignGeofence(WrappedComponent) {
  return (
    class AssignGeofenceHOC extends Component {
      static propTypes = {
        geofences: PropTypes.array,
        thingGeofences: PropTypes.array,
        thingId: PropTypes.string,
        match: PropTypes.object,
      };

      constructor(props) {
        super(props);
        this.getGeofencesToDraw = this.getGeofencesToDraw.bind(this);

        const leftRender = this.props.match.path.split('/')[1];
        this.newGeofencelink = `/${leftRender}/things/${this.props.thingId}/newgeofence`;
      }

      getGeofencesToDraw(checked, getGeofence) {
        let geofences;
        if (checked && this.props.thingGeofences != null) {
          if (this.props.thingGeofences.length === 0) {
            geofences = this.props.geofences.map(x => getGeofence(x, true));
          } else {
            geofences = this.props.geofences.map(x =>
              getGeofence(x, this.props.thingGeofences.includes(x.id)),
            );
          }
        } else {
          geofences = this.props.geofences.map(x => getGeofence(x, false));
        }
        return geofences;
      }

      agentIsEnabled = agent => (
        agent != null && agent.enabled
      );

      getMarker = thing => (
        new Marker
          .Builder(
            thing.id,
            thing.center.lat,
            thing.center.lng,
          )
          .setIcon(markerColorUrl(thing, 'grey-color'))
          .setIconSize(40, 50)
          .build()
      );

      render() {
        return (
          <WrappedComponent
            {...this.props}
            getGeofencesToDraw={this.getGeofencesToDraw}
            agentIsEnabled={this.agentIsEnabled}
            getMarker={this.getMarker}
            newGeofencelink={this.newGeofencelink}
          />
        );
      }
    }
  );
}

export default AssignGeofence;
