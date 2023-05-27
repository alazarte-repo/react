import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

class NewService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.selectedServices = new Set();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState(state => ({
        ...state,
        show: nextProps.show,
        availableReminderTypes: nextProps.availableReminderTypes,
      }));
    }
  }

  handleSubmit = () => {
    const selectedServices = Array.from(this.selectedServices);
    if (selectedServices.length > 0) {
      this.selectedServices.clear();
      this.props.handleNewServiceSubmit(selectedServices);
    }
    this.props.hide('new_service');
  }

  handleCheckBoxChange = ({ target }) => {
    if (this.selectedServices.has(target.id)) {
      this.selectedServices.delete(target.id);
    } else {
      this.selectedServices.add(target.id);
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.props.hide('new_service')}>
        <Modal.Header closeButton>
          <Modal.Title>Listado de servicios</Modal.Title>
        </Modal.Header>
        <Modal.Body className="services-modal">
          <Scrollbars style={{ height: '100%', width: '100%' }} >
            {
              this.props.availableReminderTypes.map(item => (
                <div key={item.id} className="service-item">
                  <div >
                    <h3>{item && item.name}</h3>
                    <span className="description"> En {item.repeat.mileage} km o {item.repeat.days} días </span>
                  </div>
                  <div className="checkbox">
                    <input onChange={this.handleCheckBoxChange} type="checkbox" id={item.id} />
                  </div>
                </div>
              ))
            }
          </Scrollbars>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.handleSubmit} className="btn btn-primary">
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewService.propTypes = {
  hide: PropTypes.func,
  availableReminderTypes: PropTypes.array,
  handleNewServiceSubmit: PropTypes.func,
  show: PropTypes.bool,
};


export default NewService;
