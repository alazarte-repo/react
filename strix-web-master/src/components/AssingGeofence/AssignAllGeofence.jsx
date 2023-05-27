import React from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'react-ios-switch';
import { Link } from 'react-router-dom';
import EmptyGeofence from '../EmptyGeofences';
import Map from '../Maps/Implementations';
import Panel from '../Panel';
import { Geofence } from '../Maps/Objects';
import { Grey, ActiveGeofenceColor } from '../../constants/colors';
import Spinner from '../Spinner';
import AssignGeofenceHOC from './AssignGeofenceHOC';

import './AssignGeofence.scss';

class AssignAllGeofence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      geofences: [],
      bounds: [],
    };

    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  componentWillMount() {
    const checked = this.props.agentIsEnabled(this.props.agent);

    this.setState({
      checked,
      wasChecked: checked,
      markers: this.props.things.map(this.props.getMarker),
      geofences: this.props.getGeofencesToDraw(checked, this.getGeofence),
      bounds: this.props.geofences.map(x => x.marker.key),
    });
  }

  componentWillReceiveProps(nextProps) {
    const isChecked = this.props.agentIsEnabled(nextProps.agent);
    this.setState({
      checked: isChecked,
      geofences: this.props.getGeofencesToDraw(isChecked, this.getGeofence),
    });
  }

  getGeofence = (geofence, checked) => (
    new Geofence
      .Builder(
        geofence.marker.key,
        geofence.marker.position.lat,
        geofence.marker.position.lng,
        geofence.radius,
      )
      .setLabel(geofence.label)
      .setBorderColor(checked ? 'green' : 'gray')
      .setFillColor(checked ? ActiveGeofenceColor : 'gray')
      .build()
  );

  handleToggleChange() {
    if (this.state.checked) {
      this.props.deactivateGeofence(this.props.thingId, this.props.agent.id);
    } else {
      this.props.assignAgentGeofence(this.props.thingId, []);
    }
  }

  render() {
    return (
      <Panel>
        <Panel.Header title={`Zona seguras de ${this.props.thing && this.props.thing.name}`} />
        <Panel.Body>
          <div className="geofence-configuration-switch">
            <span>Zona Segura</span>
            {
              this.props.assingGeofenceLoading &&
              <Spinner
                fontSize="20pt"
                color={Grey}
                style={{ width: 'auto' }}
              />
            }
            {
              !this.props.assingGeofenceLoading &&
              <SwitchButton
                checked={this.state.checked}
                onChange={this.handleToggleChange}
              />
            }
          </div>
          {
            this.props.geofences.length === 0 &&
              <EmptyGeofence path={this.props.newGeofencelink} />
          }
          {
            <div style={{ heigth: '100%' }}>
              <Link
                to={this.props.newGeofencelink}
                className="geofence-configuration-create-button"
              >
                <i className="icon icon-add-sign" />
              </Link>
              <Map
                geofences={this.state.geofences}
                markers={this.state.markers}
                objectsToFit={this.state.bounds}
              />
            </div>
          }
        </Panel.Body>
      </Panel>
    );
  }
}

AssignAllGeofence.propTypes = {
  things: PropTypes.array,
  geofences: PropTypes.array,
  thing: PropTypes.object,
  agent: PropTypes.object,
  assignAgentGeofence: PropTypes.func,
  deactivateGeofence: PropTypes.func,
  getGeofencesToDraw: PropTypes.func,
  agentIsEnabled: PropTypes.func,
  getMarker: PropTypes.func,
  thingId: PropTypes.string,
  newGeofencelink: PropTypes.string,
  assingGeofenceLoading: PropTypes.bool,
};

AssignAllGeofence.defaultProps = {
  things: [],
  geofences: [],
};

export default AssignGeofenceHOC(AssignAllGeofence);
