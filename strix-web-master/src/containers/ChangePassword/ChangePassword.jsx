import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import ConfigItem from '../../components/ConfigItem';
import { ExitConfirmation } from '../../components/Modals';
import { history } from '../../store';


class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      displayConfirmation: false,
      old_password: '',
    };
  }

  toggleConfirmationPopup = () => {
    this.setState(state => ({ ...state, displayConfirmation: !state.displayConfirmation }));
  };

  handleForms = (event) => {
    this.setState((state => ({
      ...state,
      [event.target.id]: event.target.value,
    })));
  };

  togglePopup = () => {
    this.setState(state => ({ ...state, showModal: !state.showModal }));
  };

  handleSubmit = () => {
    if (this.state.old_password && !this.state.new_password) {
      return this.setState(state => ({
        ...state,
        showModal: !this.state.showModal,
        modalMessage: 'Ingresá tu nueva contraseña',
      }));
    }
    if (this.state.repeatNewPass !== this.state.new_password) {
      return this.setState(state => ({
        ...state,
        showModal: !this.state.showModal,
        modalMessage: 'Las contraseñas no coinciden',
      }));
    }
    const body = {
      old_password: this.state.old_password,
      new_password: this.state.new_password,
    };
    return (this.props.changePassword(body));
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
          <h1 className="title-right-panel"> Cambiar contraseña </h1>
          <button
            className="btn btn-lg btn-primary btn-save"
            disabled={this.state.old_password === ''}
            onClick={this.handleSubmit}
          >
            Guardar
          </button>
          <Modal
            show={this.state.showModal}
            onHide={this.togglePopup}
            className="align-middle operaciones-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Cambiar contraseña</Modal.Title>
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
            label="Ingresá tu contraseña actual"
            type="password"
            id="old_password"
            callbackParent={this.handleForms}
          />
          <ConfigItem
            label="Ingresá tu nueva contraseña"
            type="password"
            id="new_password"
            callbackParent={this.handleForms}
          />
          <ConfigItem
            label="Repetir contraseña"
            type="password"
            id="repeatNewPass"
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

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
};

export default ChangePassword;
