import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CardBasicInfo.scss';


function CardBasicInfo(props) {
  const to = props.expanded ? '/dashboard' : `/dashboard/things/${props.id}`;

  return (
    <div className="card-basic-info">
      <div className="card-basic-info-name">
        <i className={`icon icon-${props.icon}`} />
        <span className="basic-info-name">{props.name}</span>
        <span className="basic-info-timeago">{props.lastUpdate}</span>
        <div className="more-link-basic" onClick={props.expandCard} >
          <Link to={to} className={props.expanded ? 'active' : ''}><i className={'icon icon-arrow'} /></Link>
        </div>
      </div>
      <div className="card-basic-info-description">
        <span> {props.location} </span>
      </div>
    </div>
  );
}

CardBasicInfo.propTypes = {
  id: PropTypes.string,
  lastUpdate: PropTypes.string,
  expandCard: PropTypes.func,
  location: PropTypes.string,
  name: PropTypes.string,
  expanded: PropTypes.bool,
  icon: PropTypes.string,
};

export default CardBasicInfo;
