import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getTripUrl } from 'utils/url';
import Timeline from '../../../../../Timeline';
import './TripSegment.scss';

const TripSegment = props => (
  <NavLink
    className={'result-card-container'}
    to={getTripUrl(props.trip.thing_id, props.trip.id)}
    activeClassName="trips-made-segment-active"
  >
    <div>
      <div className="from-data-container">
        <span className="time">{props.trip.end ? props.trip.end.parsedTime : ' 00:00'}</span>
        <Timeline type="end" />
        <span className="address">{props.trip.end ? props.trip.end.parsedAddress : 'Viaje en curso'}</span>
      </div>
      <div className="to-data-container">
        <span className="time">{props.trip.start.parsedTime}</span>
        <Timeline type="start" />
        <span className="address">{props.trip.start.parsedAddress}</span>
      </div>
    </div>
    <div className="link-container">
      <i className="icon icon-ontrip" />
    </div>
  </NavLink>
);

TripSegment.propTypes = {
  trip: PropTypes.object,
};

export default TripSegment;
