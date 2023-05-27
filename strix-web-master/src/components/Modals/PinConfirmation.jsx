/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './PinConfirmation.scss';

class PinConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: '',
    };

    // Bindings
    this.handlePinInput = this.handlePinInput.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        show: nextProps.show,
      });
    }
  }

  onClickSave() {
    this.props.save(this.state.pin);
    this.hide();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.pin.length < 4) {
      this.onClickSave();
    }
  }

  hide() {
    this.setState({
      pin: '',
    }, this.props.hide());
  }

  handlePinInput(event) {
    this.setState({ pin: event.target.value });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.hide}>
        <Modal.Header closeButton> { this.props.title }</Modal.Header>
        <Modal.Body className="pin-confirmation-modal">
          <form onSubmit={this.onSubmit}>
            <p> { this.props.text }</p>
            <input
              placeholder="Código"
              maxLength="4"
              className="form-control"
              type="password"
              autoFocus
              onChange={this.handlePinInput}
            />
            <button
              disabled={this.state.pin.length < 4}
              className="btn btn-primary"
              onClick={this.onClickSave}
            >
              Aceptar
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

PinConfirmation.propTypes = {
  hide: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  show: PropTypes.bool,
};

PinConfirmation.defaultProps = {
  title: 'Ingrese su pin',
  text: 'Ingrese su pin para continuar',
};

export default PinConfirmation;
