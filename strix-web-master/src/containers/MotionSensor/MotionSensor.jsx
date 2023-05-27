import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { history } from '../../store';
import './styles.scss';

class MotionSensor extends Component {
  state = {
    show: false,
    imageLink: '',
    label: '',
  }

  handleClick = (img, label) => {
    this.setState({ show: true, imageLink: img, label });
  }

  handleHide = () => {
    this.setState({ show: false, imageLink: '', label: '' });
  }

  render() {
    const mockData = [{
      id: 1,
      img: 'http://via.placeholder.com/350x150',
      label: 'Entrada',
    },
    {
      id: 2,
      img: 'http://via.placeholder.com/350x150',
      label: 'Living',
    },
    {
      id: 3,
      img: 'http://via.placeholder.com/350x150',
      label: 'Habitacion del guaricho',
    }];

    return (
      <div className="things-config-container">
        <div className="title-container" >
          <a
            style={{
              transform: 'rotate(180deg)',
              textDecoration: 'none',
              fontSize: '18px',
              color: 'inherit',
              marginRight: '20px',
              cursor: 'pointer',
            }}
            onClick={() => history.goBack()}
          >
            <i className="icon icon-arrow" />
          </a>
          <h1 className="title-right-panel"> Sensor de movimiento </h1>
        </div>
        <div className="config-item-container">
          <Modal show={this.state.show} onHide={this.handleHide} className="motion-sensor-modal">
            <Modal.Header closeButton>
              <Modal.Title>
                {`Sensor de movimiento - ${this.state.label}`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={this.state.imageLink} alt="" />
            </Modal.Body>
          </Modal>
          <div className="latest-update" onClick={() => this.handleClick('http://via.placeholder.com/350x150', 'Camara living')}>
            <img src="http://via.placeholder.com/350x150" alt="" />
            <div>
              <span >Camara living</span>
              <span>Hace 3 minutos</span>
            </div>
          </div>
          {mockData.map(item => (
            <div className="preview-item" key={item.id} onClick={() => this.handleClick(item.img, item.label)}>
              <img src={item.img} alt="" />
              <div>
                <span>{item.label}</span>
                <span>Martes, 10 de diciembre</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MotionSensor;

