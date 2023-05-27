import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from '../../../../../Timeline';

import './AlarmItem.scss';

function AlarmItem(props) {
  return (
    <div className={'alarm-item-container alarm-item-circle-styles alarm-item-segment-inactive'} >
      <div className="from-data-container">
        <span className="time">{moment(props.event_timestamp).format('HH:mm')}</span>
        <Timeline
          type={props.status === 'armed' ? 'locked' : 'unlocked'}
        />
        <span className="address">
          <i className={`icon icon-${props.icon}`} />
          { props.label }
        </span>
      </div>
    </div>
  );
}


AlarmItem.propTypes = {
  status: PropTypes.string,
  event_timestamp: PropTypes.number,
  label: PropTypes.string,
  icon: PropTypes.string,
};


export default AlarmItem;
