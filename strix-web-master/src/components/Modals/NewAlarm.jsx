import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RepeatDays from '../RepeatDays';
import ActionAlarm from '../ActionAlarm';
import TimeForm from '../TimeForm';

class NewAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {
        timeForm: '',
        repeatDays: '',
        actionAlarm: 'arm',
        code: '',
      },
      errors: {
        timeForm: '',
        repeatDays: '',
        actionAlarm: '',
        code: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
    });
  }

  updateState = (value, ref) => {
    switch (ref) {
      case 'timeForm':
        return this.setState(state =>
          ({ ...state, data: { ...state.data, timeForm: value } }));
      case 'repeatDays':
        return this.setState(state =>
          ({ ...state, data: { ...state.data, repeatDays: value } }));
      default:
        return this.setState(state =>
          ({ ...state, data: { ...state.data, actionAlarm: value } }));
    }
  }

  close = () => {
    this.setState(state => ({
      ...state,
      data: {
        timeForm: '',
        repeatDays: '',
        actionAlarm: 'arm',
        code: '',
      },
      errors: {
        timeForm: '',
        repeatDays: '',
        actionAlarm: '',
        code: '',
      },
    }), () => this.props.hide());
  }

  handleForm = ({ target }) => {
    this.setState(state =>
      ({ ...state, data: { ...state.data, code: target.value } }));
  }

  validateRequiredData = (data) => {
    const errors = {
      timeForm: '',
      repeatDays: '',
      actionAlarm: '',
      code: '',
    };
    if (!data.timeForm) {
      errors.timeForm = 'Hora es requerido';
    }
    if (!data.repeatDays || !data.repeatDays.length) {
      errors.repeatDays = 'Repetir es requerido';
    }
    if (!data.actionAlarm) {
      errors.actionAlarm = 'Acción es requerido';
    }
    if (typeof data.code === 'undefined' || !data.code.match(/^\d{4}$/)) {
      errors.code = 'Código es requerido y debe ser de 4 dígitos';
    }
    this.setState(state =>
      ({ ...state, errors: errors }));
    return (errors.timeForm === '' && errors.repeatDays === '' && errors.actionAlarm === '' && errors.code === '');
  }

  handleSubmit = () => {
    const { data } = this.state;
    if (this.validateRequiredData(data)) {
      this.props.createAlarm(this.props.thingId, data);
      this.close();
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.close()}>
        <Modal.Header closeButton>Nueva alarma</Modal.Header>
        <Modal.Body className="new-alarm-modal">
          <span style={{ color: 'red', fontSize: '12px' }}>
            { this.state.errors.timeForm }
          </span>
          <span style={{ color: 'red', fontSize: '12px' }}>
            { this.state.errors.repeatDays}
          </span>
          <span style={{ color: 'red', fontSize: '12px' }}>
            { this.state.errors.actionAlarm }
          </span>
          <span style={{ color: 'red', fontSize: '12px' }}>
            { this.state.errors.code }
          </span>
          <TimeForm updateParentState={this.updateState} />
          <div className="repeat-container">
            <span>Repetir</span>
            <RepeatDays
              updateParentState={this.updateState}
              selectedDays={[]}
            />
          </div>
          <ActionAlarm
            updateParentState={this.updateState}
            action={this.state.data.actionAlarm}
          />
          <div className="input-container">
            <span>Código</span>
            <input
              type="password"
              maxLength="4"
              onChange={event => this.handleForm(event)}
            />
          </div>
          <button
            className="btn btn-lg btn-primary"
            onClick={() => this.handleSubmit()}
          >Crear</button>
        </Modal.Body>
      </Modal>
    );
  }
}

NewAlarm.propTypes = {
  hide: PropTypes.func,
  show: PropTypes.bool,
  createAlarm: PropTypes.func,
  thingId: PropTypes.string,
};


export default NewAlarm;
