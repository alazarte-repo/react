import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OkCancel = ({ hide, show, title, accept, children }) => (
  <Modal show={show} onHide={() => hide()}>
    <Modal.Header closeButton>{title}</Modal.Header>
    <Modal.Body className="geofence-configuration-modal">
      { children }
      <div>
        <button className="btn" style={{ margin: '2px' }} onClick={hide}>
          Cancelar
        </button>
        <button className="btn btn-primary" style={{ margin: '2px' }} onClick={accept}>
          Aceptar
        </button>
      </div>
    </Modal.Body>
  </Modal>
);

OkCancel.propTypes = {
  show: PropTypes.bool,
  hide: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default OkCancel;
