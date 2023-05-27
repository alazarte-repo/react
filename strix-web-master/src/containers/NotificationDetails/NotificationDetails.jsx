import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from '../../components/SectionTitle';
import NotificationEventDetails from '../../components/NotificationEventDetails';
import './NotificationDetails.scss';

const NotificationDetails = ({ notification }) => (
  <div className="notification-details">
    <SectionTitle text="Detalles de notificación" />
    <span className="timestamp"> { notification.date } </span>

    <div className="notification-title">
      <i className={`icon ${notification.icon}`} />
      <div className="information">
        <h3>{ notification.subject }</h3>
        <span className="description">{ notification.body }</span>
      </div>
    </div>
    <div className="notification-event-details">
      <NotificationEventDetails
        detailType={notification.detailType}
        eventDetail={notification.eventDetail}
      />
    </div>
  </div>
);

NotificationDetails.propTypes = {
  notification: PropTypes.object,
};

export default NotificationDetails;

