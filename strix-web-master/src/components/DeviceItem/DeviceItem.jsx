import React from 'react';
import PropTypes from 'prop-types';
import DateTimeUtils from '../../utils/DateTimeUtils';
import './styles.scss';

function DeviceItem(props) {
  return (
    <div className="device-item-container">
      <div className="device-item-label">
        <h4>{props.name}</h4>
        <span>{props.location && props.location} {DateTimeUtils.timestampToDate(props.date)}</span>
      </div>
      <div className="value-container-device">
        <span>{props.phoneNumber && props.phoneNumber}</span>
      </div>
    </div>
  );
}
DeviceItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.number,
  phoneNumber: PropTypes.string,
  location: PropTypes.string,
};

export default DeviceItem;
