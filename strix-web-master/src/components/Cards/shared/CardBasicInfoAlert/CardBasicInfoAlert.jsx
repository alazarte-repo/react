import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CardBasicInfoAlert.scss';


function CardBasicInfoAlert(props) {
  const to = props.expanded ? '/dashboard' : `/dashboard/things/${props.id}`;

  return (
    <div>
      <div className="card-basic-info-alert">
        <div className="more-link-basic-alert" onClick={props.expandCard} >
          <Link to={to} className={props.expanded ? 'active' : null}>
            <i className="icon icon-arrow" />
          </Link>
        </div>
        <div className="card-basic-info-alert-content">
          <i className={`icon icon-${props.icon}`} />

          <div className="card-basic-info-alert-middle">
            <div className="card-basic-info-name">
              <span className="basic-info-alert-name">{props.name}</span>
              <span className="basic-info-alert-timeago">{props.lastUpdate}</span>
            </div>
            <div className="card-basic-info-alerts">
              {props.agents
                .filter(agent => !agent.current_status.normal)
                .map(data => (
                  <span key={`errorStatus-${data.id}`}>
                    { data.current_status.details }
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="card-basic-info-description">
        <span> {props.location} </span>
      </div>
    </div>
  );
}

CardBasicInfoAlert.propTypes = {
  lastUpdate: PropTypes.string,
  id: PropTypes.string,
  expandCard: PropTypes.func,
  location: PropTypes.string,
  name: PropTypes.string,
  agents: PropTypes.array,
  expanded: PropTypes.bool,
  icon: PropTypes.string,
};

export default CardBasicInfoAlert;
