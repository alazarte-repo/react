import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getSingleThingUrl, getSingleThingServiceUrl } from 'utils/url';
import './ServiceNotification.scss';


function ServiceNotification(props) {
  const urlIsService = window.location.pathname.indexOf('services') !== -1;
  const isSelected = urlIsService ? 'service-notification-active' : 'service-notification-inactive';
  const serviceStyles = `service-notification-container ${isSelected}`;
  const to = urlIsService ?
    getSingleThingUrl(props.thingId) : getSingleThingServiceUrl(props.thingId);
  return (
    <Link to={to} className={serviceStyles}>
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

ServiceNotification.propTypes = {
  thingId: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
  icon: PropTypes.string,
};

export default ServiceNotification;
