import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/* import { getSingleThingUrl  getSingleThingServiceUrl } from 'utils/url'; */

function AlarmNotification(props) {
  const urlIsAlarm = window.location.pathname.indexOf('alarms') !== -1;
  const isSelected = urlIsAlarm ? 'service-notification-active' : 'service-notification-inactive';
  const serviceStyles = `service-notification-container ${isSelected}`;
  /* const to = urlIsAlarm ?
    getSingleThingUrl(props.thingId) : getSingleThingServiceUrl(props.thingId); */
  return (
    <Link to={`/dashboard/things/${props.thingId}/alarms`} className={serviceStyles}>
      <div>
        <i className={`icon icon-${props.icon}`} />
        <div className="service-notification-data">
          <h4>{props.title}</h4>
          <span>{props.data}</span>
        </div>
        <i className="icon icon-arrow" />
      </div>
    </Link>
  );
}

AlarmNotification.propTypes = {
  thingId: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
  icon: PropTypes.string,
};

export default AlarmNotification;
