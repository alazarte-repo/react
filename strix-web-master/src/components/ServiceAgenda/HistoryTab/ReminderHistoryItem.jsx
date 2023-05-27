import React from 'react';
import PropTypes from 'prop-types';

const ReminderHistoryItem = ({ name, date, icon, mileage }) => (
  <div className="history-service-item">
    <div className="icon-container">
      <i className={`icon icon-${icon} service-icon`} />
    </div>
    <div className="history-service-name">
      { name }
    </div>
    <div className="history-service-data">
      <div className="history-service-date">
        { date }
      </div>
      <div className="history-service-mileage">
        { mileage }
      </div>
    </div>
  </div>
);

ReminderHistoryItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  icon: PropTypes.string,
  mileage: PropTypes.string,
};

export default ReminderHistoryItem;
