import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Indicator from './Indicator';
import './CardAdditionalInfo.scss';


function CardAdditionalInfo(props) {
  const path = props.rightIcon === 'velocity' ?
    `/dashboard/things/${props.id}/${props.rightIcon}` : `/dashboard/things/${props.id}/`;
  return (
    <div className="card-additional-info">
      <div className="left-indicator">
        <Link to={`/dashboard/things/${props.id}/assign-geofence`}>
          <div>
            <i className={`icon icon-${props.leftIcon}`} />
            <Indicator data={props.leftData} title={props.leftTitle} />
          </div>
        </Link>
      </div>
      <div className="right-indicator">
        <Link to={path} style={props.style && props.style}>
          <div>
            <i className={`icon icon-${props.rightIcon}`} />
            <Indicator data={props.rightData} title={props.rightTitle} />
          </div>
        </Link>
      </div>
    </div>
  );
}

CardAdditionalInfo.propTypes = {
  style: PropTypes.object,
  leftTitle: PropTypes.string,
  leftData: PropTypes.string,
  rightTitle: PropTypes.string,
  rightData: PropTypes.string,
  id: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default CardAdditionalInfo;
