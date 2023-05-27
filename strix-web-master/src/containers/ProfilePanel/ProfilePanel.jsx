import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import OkCancelModal from '../../components/Modals/OkCancel';
import ClientData from '../../components/ClientData';
import ProfileMenuItem from '../../components/ProfileMenuItem';

const Modals = Object.freeze({
  Logout: 'logout',
  ForgotPin: 'forgot-pin',
});

class ProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState(state => ({ ...state, showModal: !this.state.showModal }));
    this.props.requestLogout();
  }

  handleClick(event) {
    event.persist();
    this.setState({ showModal: event.target.id });
  }

  hideModal() {
    this.setState({ showModal: null });
  }

  render() {
    const clientName = this.props.user &&
      `${this.props.user.firstName} ${this.props.user.middleName} ${this.props.user.lastName}`;
    return (
      <div className="configuration-panel">
        <ClientData
          name={clientName}
          email={this.props.user && this.props.user.username}
        />
        <ProfileMenuItem
          path="/profile/change-password"
          activePath={this.props.url}
          item="Cambiar contraseña"
        />
        <ProfileMenuItem
          path="/profile/change-pin"
          activePath={this.props.url}
          item="Cambiar pin"
        />
        <ProfileMenuItem
          onClick={this.handleClick}
          id={Modals.ForgotPin}
          path="#"
          item="Olvidé mi pin"
        />
        <ProfileMenuItem
          path="/profile/devices"
          activePath={this.props.url}
          item="Dispositivos con sesiones abiertas"
        />
        <ProfileMenuItem
          path="#"
          item="Cerrar sesión"
          onClick={this.handleClick}
          id={Modals.Logout}
        />
        {
          <OkCancelModal
            show={this.state.showModal === Modals.Logout}
            accept={this.handleSubmit}
            hide={this.hideModal}
            title="Cerrar sesión"
          >
            <p> ¿Estas seguro de que quieres cerrar sesion? </p>
          </OkCancelModal>
        }
        {
          <Modal
            show={this.state.showModal === Modals.ForgotPin}
            onHide={this.hideModal}
            className="align-middle operaciones-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Olvide mi pin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Si olvidaste tu PIN, comunicate al <a href={`tel:${this.props.customerCarePhone}`}>{this.props.customerCarePhone}</a>.
                Lunes a Viernes de 9 a 18hs.
              </p>
            </Modal.Body>
          </Modal>
        }
      </div>
    );
  }
}

ProfilePanel.propTypes = {
  user: PropTypes.object,
  customerCarePhone: PropTypes.string,
  url: PropTypes.string,
  requestLogout: PropTypes.func,
};

export default ProfilePanel;
