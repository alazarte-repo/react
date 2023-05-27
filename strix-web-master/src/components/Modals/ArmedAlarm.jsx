import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ArmedAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        show: nextProps.show,
      });
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.props.hide()}>
        <Modal.Header closeButton>Configuracion de alarma</Modal.Header>
        <Modal.Body className="geofence-configuration-modal">
          <p> {this.props.errorMessage} </p>
          <button
            className="btn btn-lg btn-primary"
            onClick={() => this.props.accept()}
          >Aceptar</button>
        </Modal.Body>
      </Modal>
    );
  }
}

ArmedAlarm.propTypes = {
  hide: PropTypes.func,
  show: PropTypes.bool,
  accept: PropTypes.func,
  errorMessage: PropTypes.string,
};


export default ArmedAlarm;
