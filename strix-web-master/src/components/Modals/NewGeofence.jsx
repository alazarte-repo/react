import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class NewGeofenceName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({ show: nextProps.show });
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.hide}>
        <Modal.Header closeButton>Zona segura</Modal.Header>
        <Modal.Body className="geofence-configuration-modal">
          <p>Asigná un nombre a la zona segura</p>
          <div className="name-input">
            <input
              placeholder="Nombre"
              type="text"
              maxLength="20"
              onChange={evt => this.props.formHandler(evt)}
              value={this.props.name}
            />
            <span>{this.props.charLength}/20</span>
          </div>
          <button
            className="btn btn-lg btn-primary"
            onClick={this.props.save}
          >
            Aceptar
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}

NewGeofenceName.propTypes = {
  hide: PropTypes.func,
  show: PropTypes.bool,
  save: PropTypes.func,
  name: PropTypes.string,
  formHandler: PropTypes.func,
  charLength: PropTypes.number,
};


export default NewGeofenceName;
