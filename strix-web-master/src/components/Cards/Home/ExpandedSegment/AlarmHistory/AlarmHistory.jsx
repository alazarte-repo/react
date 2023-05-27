import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import AlarmItem from './AlarmItem';
import './AlarmHistory.scss';

const createListItems = items =>
  items.map(item => <AlarmItem key={item.event_timestamp} {...item} />);

const AlarmHistory = ({ signals }) => {
  const signalsKeys = Object.keys(signals);

  if (signalsKeys.length === 0) {
    return null;
  }

  return (
    <div className="alarm-list-container">
      <h4> Registro de alarmas </h4>
      {signalsKeys.map(v => (
        <div key={v}>
          <h4>{ moment(v, 'MM/DD/YYYY').format('dddd, DD MMMM YYYY') }</h4>
          { createListItems(signals[v]) }
        </div>
      ))}
    </div>
  );
};

AlarmHistory.propTypes = {
  signals: PropTypes.object,
};

export default AlarmHistory;
