import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Panel from '../../components/Panel';
import { TripMap } from '../../components/Maps';
import './styles.scss';
import WorkingScreen from '../../components/WorkingScreen';

class TripDetails extends React.Component {
  componentWillMount() {
    this.props.selectTripDetails(this.props.thingId, this.props.tripId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tripId !== nextProps.tripId) {
      this.props.selectTripDetails(nextProps.thingId, nextProps.tripId);
    }

    if (this.props.sendTripViewEvent != null && this.props.loading && !nextProps.loading) {
      this.props.sendTripViewEvent(nextProps.startDate);
    }
  }

  render() {
    const to = `/dashboard/things/${this.props.thingId}/`;
    return (
      <Panel>
        <div className="geofence-configuration-header">
          <div className="geofence-configuration-title">
            <Link to={to} className="btn-close">
              <i className="icon icon-arrow" />
            </Link>
            <h2>Viajes realizados <span className="trip-date">{this.props.date}</span></h2>
          </div>
        </div>
        <Panel.Body>
          {
            this.props.loading &&
            <div className="trip-details-container">
              <WorkingScreen message="Cargando viaje..." />
            </div>
          }
          {
            !this.props.loading &&
            <div className="trip-details-container">
              <div className="trip-details-info">
                <div className="data-container max-velocity">
                  <span className="data">{!this.props.max_speed ? '0' : this.props.max_speed} km/h</span>
                  <span className="title">Velocidad máxima</span>
                </div>
                <div className="data-container distance-travelled">
                  <span className="data">{!this.props.mileage ? '0.0' : this.props.mileage.toFixed(1)} km</span>
                  <span className="title">Distancia recorrida</span>
                </div>
                <div className="data-container trip-duration">
                  <span className="data">{this.props.durationHumanized} </span>
                  <span className="title">Duracion del viaje</span>
                </div>
              </div>
              <div className="map-container">
                <TripMap
                  polylinePath={this.props.polylinePath}
                  polylineMarkers={this.props.polylineMarkers}
                  thingId={this.props.thingId}
                  selectedTripId={this.props.selectedTripId}
                />
              </div>
            </div>
          }
        </Panel.Body>
      </Panel>
    );
  }
}

TripDetails.propTypes = {
  selectTripDetails: PropTypes.func,
  sendTripViewEvent: PropTypes.func,
  thingId: PropTypes.string,
  tripId: PropTypes.string,
  max_speed: PropTypes.number,
  mileage: PropTypes.number,
  durationHumanized: PropTypes.string,
  polylinePath: PropTypes.array,
  polylineMarkers: PropTypes.array,
  date: PropTypes.string,
  selectedTripId: PropTypes.string,
  loading: PropTypes.bool,
  startDate: PropTypes.number,
};

export default TripDetails;
