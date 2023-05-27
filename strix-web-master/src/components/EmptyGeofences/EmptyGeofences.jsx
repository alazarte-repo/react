import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import geofenceConfigImage from 'images/geofeceConfig.svg';
import './styles.scss';


function EmptyGeofeces(props) {
  return (
    <div className="empty-geofence-container">
      <img src={geofenceConfigImage} className="center-block" alt="strix" />
      <span> Creá tu primer zona segura para tus productos </span>
      <Link className="add-service-button" to={props.path}>
        <i className="icon icon-add-sign" />
      </Link>
    </div>
  );
}
EmptyGeofeces.propTypes = {
  path: PropTypes.string,
};

export default EmptyGeofeces;

