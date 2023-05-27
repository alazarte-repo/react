import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './Menu.scss';

class MenuPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState(state => ({ showModal: !state.showModal }));
  }

  render() {
    return (
      <Fragment>
        <aside className="strix-menu-panel">
          <ul>
            <li>
              <NavLink to="/dashboard" onClick={() => this.props.showServicePanel()}>
                <i className="icon icon-strix" />
                <span>Servicios</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <i className="icon icon-profile" />
                <span>Mi Perfil</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/configuration">
                <i className="icon icon-configuration" />
                <span>Configuracion</span>
              </NavLink>
            </li>
            <div className="align-to-bottom">
              <li className="operaciones" >
                <a href="#" onClick={this.togglePopup}>
                  <i className="icon icon-operations" />
                  <span>Central de Operaciones</span>
                </a>
              </li>
            </div>
          </ul>
        </aside>

        <Modal show={this.state.showModal} onHide={this.togglePopup} className="align-middle operaciones-modal">
          <Modal.Header closeButton>
            <Modal.Title>Central de operaciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>En caso de emergencia, comunicate con Strix al <a href={`tel:${this.props.operationsPhoneNumber}`}>{this.props.operationsPhoneNumber}</a> las 24hs.</p>
            <button className="btn btn-lg btn-primary btn-modal" onClick={this.togglePopup}>Aceptar</button>
          </Modal.Body>
        </Modal>

      </Fragment>
    );
  }
}

MenuPanel.propTypes = {
  operationsPhoneNumber: PropTypes.string,
  showServicePanel: PropTypes.func,
};

export default MenuPanel;
