import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getNotificationIdUrl } from '../../utils/url';
import './NotificationItem.scss';


const NotificationItem = ({ id, icon, subject, body, time, read,
  highlightActive, showGoArrow, onClick }) => {
  const cardClass = read ? '' : 'recent';
  const activeClass = highlightActive ? 'active' : '';
  return (
    <NavLink
      className={`notification-card ${cardClass}`}
      to={getNotificationIdUrl(id)}
      activeClassName={activeClass}
    >
      <div onClick={onClick} className="notification-item-body" >
        <i className={`icon ${icon}`} />
        <div className="notification-data">
          <h3>{ subject }</h3>
          <span className="description">{ body }</span>
        </div>
        <div className="more-info">
          <span className="timestamp">{ time }</span>
          {
            showGoArrow &&
            <i className="go-details icon icon-forward" />
          }
        </div>
      </div>
    </NavLink>
  );
};

NotificationItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  subject: PropTypes.string,
  time: PropTypes.string,
  body: PropTypes.string,
  read: PropTypes.bool,
  highlightActive: PropTypes.bool,
  showGoArrow: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NotificationItem;
