import React from 'react';
import PropTypes from 'prop-types';
import { serviceAgendaUtils } from 'utils';
import GoArrow from '../../../GoArrow';

const ReminderItem = ({ reminder, mileage, handleModal }) => {
  const mileageLeft = (reminder.notify_at.mileage - mileage).toLocaleString('es-AR');
  const timeLeft = serviceAgendaUtils.getTimeDifference(reminder.notify_at.date);
  const progressStyles = serviceAgendaUtils.getPercentage(reminder, mileage);
  return (
    <div className="agenda-reminder-container">
      <div className="reminder-icon-container">
        <i className={`icon icon-${reminder.icon} reminder-service-icon`} />
      </div>
      <div className="reminder-middle-container">
        <h4>{reminder.name}</h4>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
            style={progressStyles}
          >
            <span className="sr-only">70% Complete</span>
          </div>
        </div>
        <span>Faltan {mileageLeft} km o {timeLeft}</span>
      </div>
      <GoArrow onClick={() => handleModal('config_service', reminder)} />
    </div>
  );
};

ReminderItem.propTypes = {
  reminder: PropTypes.object,
  mileage: PropTypes.number,
  handleModal: PropTypes.func,
};

export default ReminderItem;
