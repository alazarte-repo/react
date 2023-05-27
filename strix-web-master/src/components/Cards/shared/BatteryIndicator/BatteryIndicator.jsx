import React from 'react';
import PropTypes from 'prop-types';
import './BatteryIndicator.scss';

function BatteryIndicator(props) {
  const batteryIcon = 'battery-mid';
  // use icons: battery-low battery-mid battery-full

  const percentage = `${props.batteryLevel}%`;
  const data = 'Bateria OK';

  return (
    <div className="container-battery-indicator">
      <i className={`icon icon-${batteryIcon}`} />
      <div className="indicator-container">
        <span className="indicator-percentage">{percentage}</span>
        <span className="indicator-data">{data} </span>
      </div>
    </div>
  );
}

BatteryIndicator.propTypes = {
  batteryLevel: PropTypes.string,
};

export default BatteryIndicator;
