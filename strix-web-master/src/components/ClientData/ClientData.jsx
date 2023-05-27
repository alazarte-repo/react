import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ClientData(props) {
  return (
    <div className="client-data-container">
      <h2>Datos del cliente</h2>
      <h3>{props.name}</h3>
      <span>{props.email}</span>
    </div>
  );
}
ClientData.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

export default ClientData;
