import React from 'react';
import PropTypes from 'prop-types';
import { dateTimeUtils } from 'utils';
import TripSegment from './TripSegment';
import './TripsList.scss';

// TODO: Quitar esto!

class TripsList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.availableTrips !== this.props.availableTrips) {
      nextProps.availableTrips.forEach((trip) => {
        if (!this.timestamps.has(dateTimeUtils.timestampToDate(trip.start.timestamp))) {
          this.timestamps.add(dateTimeUtils.timestampToDate(trip.start.timestamp));
        }
      });
    }
  }
  componentWillUnmount() {
    this.timestamps.clear();
  }
  timestamps= new Set()
  selectTrip = tripSegmentProps => () => {
    this.props.selectTrip(tripSegmentProps.id);
  };

  createListItems = trips => trips.map(trip => (
    <TripSegment
      key={trip.id}
      selected={this.props.selectedTripId === trip.id}
      trip={trip}
      selectTrip={this.selectTrip}
      selectTripDetails={this.props.selectTripDetails}
    />
  ));
  render() {
    return (
      <div className="trips-list-container">
        { this.props.availableTrips &&
          Array.from(this.timestamps).map(key => (
            <div key={key}>
              <h4>{key}</h4>
              {
                this.createListItems(this.props.availableTrips
                  .filter(trips =>
                    key === dateTimeUtils.timestampToDate(trips.start.timestamp),
                  ),
                )
              }
            </div>
          ))
        }
      </div>
    );
  }
}

TripsList.propTypes = {
  selectedTripId: PropTypes.string,
  selectTrip: PropTypes.func,
  availableTrips: PropTypes.array,
  selectTripDetails: PropTypes.func,
};

export default TripsList;
