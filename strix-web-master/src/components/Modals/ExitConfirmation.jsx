import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ExitConfirmation = ({ hide, show, accept, componentName, children }) => (
  <Modal show={show} onHide={hide}>
    <Modal.Header closeButton>{componentName}</Modal.Header>
    <Modal.Body className="geofence-configuration-modal">
      {children != null
        ? children
        : <p>¿Estas seguro de que deseas salir sin guardar los cambios?</p>}
      <button
        className="btn btn-lg btn-primary"
        onClick={accept}
      >Aceptar</button>
    </Modal.Body>
  </Modal>
);

ExitConfirmation.propTypes = {
  hide: PropTypes.func,
  show: PropTypes.bool,
  accept: PropTypes.func,
  componentName: PropTypes.string,
  children: PropTypes.node,
};


export default ExitConfirmation;
