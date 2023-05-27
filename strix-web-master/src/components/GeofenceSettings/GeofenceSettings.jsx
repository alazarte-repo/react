import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Map from '../Maps/ConfigMap';
import Panel from '../Panel';
import EmptyGeofences from '../EmptyGeofences';
import './GeofenceSettings.scss';


class GeofenceSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGeofence: '',
    };
  }

  geofenceClick = (geofenceId) => {
    this.setState(state => ({
      ...state,
      selectedGeofence: geofenceId === state.selectedGeofence ? '' : geofenceId,
    }));
  }
  render() {
    return (
      <div className="geofence-configuration-container">
        <Panel className="geofence-configuration-container">
          <Panel.Header title="Zonas seguras">
            <button
              className={`btn btn-lg ${this.state.selectedGeofence ? 'btn-primary' : 'btn-error'}`}
              disabled={this.state.selectedGeofence === ''}
            >Guardar</button>
            <button
              className="btn btn-lg btn-error"
              disabled={this.state.selectedGeofence === ''}
              onClick={() => this.props.deleteGeofence(this.state.selectedGeofence)}
            >
              Eliminar
            </button>
          </Panel.Header>
          <Panel.Body>
            {!this.props.geofences.length ?
              <EmptyGeofences path={'/configuration/geofences-config/newgeofence'} /> :
              <div>
                <Link
                  style={{ top: '43px' }}
                  to={'/configuration/geofences-config/newgeofence'}
                  className="geofence-configuration-create-button"
                >
                  <i className="icon icon-add-sign" />
                </Link>
                <Map
                  containerElement={<div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
                  mapElement={<div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
                  geofences={this.props.geofences}
                  highlightedGeofence={this.state.selectedGeofence}
                  onGeofenceClick={this.geofenceClick}
                />
              </div>
            }
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}


GeofenceSettings.propTypes = {
  geofences: PropTypes.array,
  deleteGeofence: PropTypes.func,
};


export default GeofenceSettings;
