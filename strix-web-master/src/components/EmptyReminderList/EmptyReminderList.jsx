import React from 'react';
import PropTypes from 'prop-types';
import { getServiceImage } from '../../utils/serviceAgenda';

function EmptyReminderList({ handleModal, vehicleSubtype }) {
  return (
    <div className="empty-reminders-container">
      <img className="maintenance-image center-block" src={getServiceImage(vehicleSubtype)} alt="strix" />
      <span> Agrega los mantenimientos que quieras que te avisemos </span>
      <button className="add-service-button" onClick={() => handleModal('new_service')}>
        <i className="icon icon-add-sign" />
      </button>
    </div>
  );
}

EmptyReminderList.propTypes = {
  handleModal: PropTypes.func,
  vehicleSubtype: PropTypes.string,
};

export default EmptyReminderList;

