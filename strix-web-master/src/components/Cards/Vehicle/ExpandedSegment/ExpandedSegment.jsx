import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ServiceNotification from '../../shared/ServiceNotification';
import TripsList from './TripsList';
// import DateRangeSegment from '../../shared/DateRangeSegment';
import './ExpandedSegment.scss';


class ExpandedSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationTitle: 'Agenda de servicios',
      notificationData: `Distancia acumulada ${props.mileage.toLocaleString('es-005')} Km`,
    };
  }

  componentWillUnmount() {
    this.props.resetTripsList(this.props.thingId);
  }

  render() {
    return (
      <div className="vehicle-expanded-container">
        <ServiceNotification
          thingId={this.props.thingId}
          selected={this.props.selectedServiceNotification}
          title={this.state.notificationTitle}
          data={this.state.notificationData}
          icon="service-agenda"
          selectServiceNotification={this.props.selectServiceNotification}
        />
        {/* <DateRangeSegment
          title={rangeTitle}
          thingId={this.props.thingId}
          data={this.props.dateRange}
          onChange={this.props.changeDateRangeSegment}
        /> */}
        <TripsList
          thingId={this.props.thingId}
          showTripList={this.props.showTripList}
          selectedTripId={this.props.selectedTripId}
          availableTrips={this.props.availableTrips}
          selectTrip={this.props.selectTrip}
          selectTripDetails={this.props.selectTripDetails}
        />
      </div>
    );
  }
}

ExpandedSegment.propTypes = {
  mileage: PropTypes.number,
  showTripList: PropTypes.func,
  selectServiceNotification: PropTypes.func,
  selectTripDetails: PropTypes.func,
  selectTrip: PropTypes.func,
  resetTripsList: PropTypes.func,
  selectedTripId: PropTypes.string,
  availableTrips: PropTypes.array,
  selectedServiceNotification: PropTypes.bool,
  thingId: PropTypes.string,

};

export default ExpandedSegment;

