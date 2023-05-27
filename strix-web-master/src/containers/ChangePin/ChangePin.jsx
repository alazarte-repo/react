import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { ExitConfirmation } from '../../components/Modals';
import ConfigItem from '../../components/ConfigItem';
import { history } from '../../store';


class ChangePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, displayConfirmation: false, old_pin: '' };
  }

  handleForms = (event) => {
    this.setState((state => ({
      ...state,
      [event.target.id]: event.target.value,
    })));
  }

  togglePopup = () => {
    this.setState(state => ({ ...state, showModal: !state.showModal }));
  }

  handleSubmit = () => {
    if (this.state.old_pin !== this.props.user.securityPin) {
      return this.setState(state => ({
        ...state,
        showModal: !this.state.showModal,
        modalMessage: 'Tu pin actual no coincide',
      }));
    }
    if (this.state.old_pin && !this.state.new_pin) {
      return this.setState(state => ({
        ...state,
        showModal: !this.state.showModal,
        modalMessage: 'Ingresá tu nueva contraseña',
      }));
    }

    if (this.state.repeat_new_pin !== this.state.new_pin) {
      return this.setState(state => ({
        ...state,
        showModal: !this.state.showModal,
        modalMessage: 'Las contraseñas no coinciden',
      }));
    }
    return (this.props.changePin(this.state.new_pin));
  }

  toggleConfirmationPopup = () => {
    this.setState(state => ({ ...state, displayConfirmation: !state.displayConfirmation }));
  };

  goBackWithoutSaving = () => {
    this.toggleConfirmationPopup();
    history.goBack();
  };

  render() {
    return (
      <div className="things-config-container">
        <div className="title-container">
          <a
            onClick={() => this.toggleConfirmationPopup()}
            style={{
              transform: 'rotate(180deg)',
              textDecoration: 'none',
              color: 'inherit',
              marginRight: '20px',
              cursor: 'pointer',
            }}
          >
            <i className="icon icon-arrow" />
          </a>
          <h1 className="title-right-panel"> Cambiar Pin </h1>
          <button
            className="btn btn-lg btn-primary btn-save"
            onClick={this.handleSubmit}
            disabled={this.state.old_pin === ''}
          >
            Guardar
          </button>
          <Modal
            show={this.state.showModal}
            onHide={this.togglePopup}
            className="align-middle operaciones-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Cambiar pin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {this.state.modalMessage}
              </p>
            </Modal.Body>
          </Modal>
        </div>
        <div className="config-item-container">
          <ConfigItem
            label={'Ingresá tu pin actual'}
            type="password"
            id="old_pin"
            maxLength="4"
            callbackParent={this.handleForms}
          />
          <ConfigItem
            label={'Ingresá tu nuevo pin'}
            type="password"
            maxLength="4"
            id="new_pin"
            callbackParent={this.handleForms}
          />
          <ConfigItem
            label={'Repetí tu pin'}
            type="password"
            maxLength="4"
            id="repeat_new_pin"
            callbackParent={this.handleForms}
          />
        </div>
        <ExitConfirmation
          show={this.state.displayConfirmation}
          accept={this.goBackWithoutSaving}
          hide={this.toggleConfirmationPopup}
          componentName={'Nueva zona segura'}
        />
      </div>
    );
  }
}

ChangePin.propTypes = {
  changePin: PropTypes.func,
  user: PropTypes.object,
};

export default ChangePin;
