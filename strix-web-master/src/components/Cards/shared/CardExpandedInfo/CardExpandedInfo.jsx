import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import '../CardBasicInfo/CardBasicInfo.scss';
import './CardExpandedInfo.scss';

function CardExpandenInfo(props) {
  const iconArrow = props.expanded ? 'icon-collapse-arrow' : 'icon-arrow-expanded';
  return (
    <div className="card-expanded-info">
      <div className="card-expanded-title">
        <i className={`icon icon-${props.icon}`} />
        <span className="basic-info-name">{props.name}</span>
        <div className="more-link-basic" onClick={props.expandCard}>
          <Link to="/dashboard" ><i className={`icon ${iconArrow}`} /></Link>
        </div>
      </div>
    </div>
  );
}

CardExpandenInfo.propTypes = {
  expandCard: PropTypes.func,
  name: PropTypes.string,
  icon: PropTypes.string,
  expanded: PropTypes.bool,
};


export default CardExpandenInfo;
