import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { history } from '../../store';
import DeviceItem from '../../components/DeviceItem/index';
import './Devices.scss';

class ChangePassWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleSubmit = () => {
    this.props.deviceList
      .forEach((device) => {
        if (localStorage.getItem('DEVICE_ID') !== device.id) {
          this.props.revoqueDevice(device.id);
        }
      });
    this.togglePopup();
  }

  togglePopup = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div className="things-config-container change-password-containerd device-container">
        <div className="title-container title-container-device" >
          <a onClick={history.goBack} >
            <i className="icon icon-arrow" />
          </a>
          <h1 className="title-right-panel"> Dispositivos con sesiones abiertas </h1>
          <button
            className="btn btn-lg btn-primary btn-block btn-save"
            onClick={this.togglePopup}
          >
            Cerrar todos los dispositivos
          </button>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={this.togglePopup}
          className="align-middle operaciones-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Cerrar sesion en todos los dispositivos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estas seguro de que deseas cerrar todas las sesiones en tus dispositivos?</p>
            <button
              className="btn btn-lg btn-primary btn-modal"
              onClick={this.handleSubmit}
            >
              Aceptar
            </button>
          </Modal.Body>
        </Modal>

        <Scrollbars
          style={{ height: '100%', width: '100%', backgroundColor: '#e4e4e4' }}
          renderTrackHorizontal={v => <div {...v} className="track-horizontal" style={{ display: 'none' }} />}
          renderThumbHorizontal={v => <div {...v} className="thumb-horizontal" style={{ display: 'none' }} />}
        >
          {this.props.deviceList && this.props.deviceList.map(device => (
            <DeviceItem
              name={device.name}
              date={device.created_timestamp}
              key={device.created_timestamp}
            />
          ))}
        </Scrollbars>

      </div>
    );
  }
}

ChangePassWord.propTypes = {
  deviceList: PropTypes.array,
  revoqueDevice: PropTypes.func,
};

export default ChangePassWord;
