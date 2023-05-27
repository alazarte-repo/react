import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RepeatDays from '../RepeatDays';
import ActionAlarm from '../ActionAlarm';
import TimeForm from '../TimeForm';

class EditAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      valuesUpdated: false,
      alarm: {},
      toggleSwitch: true,
      data: {
        timeForm: '',
        repeatDays: [],
        actionAlarm: null,
        code: '',
        oldTimeForm: '',
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
    this.setState(state => ({
      ...state,
      show: nextProps.show,
      valuesUpdated: false,
      alarm: nextProps.alarm,
      data: {
        ...state.data,
        timeForm: nextProps.alarm && `${nextProps.alarm.cron.hour}:${nextProps.alarm.cron.minutes}`,
        oldTimeForm: nextProps.alarm && `${nextProps.alarm.cron.hour}:${nextProps.alarm.cron.minutes}`,
        repeatDays: nextProps.alarm && nextProps.alarm.cron.dow,
        actionAlarm: nextProps.alarm && nextProps.alarm.action,
        code: nextProps.alarm && nextProps.alarm.properties.code,
      },
      errors: {
        timeForm: '',
        repeatDays: '',
        actionAlarm: '',
        code: '',
      },
    }));
  }

  getCompleteTime = () => {
    if (this.props.alarm) {
      const { hour, minutes } = this.props.alarm.cron;
      return `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }
    return '';
  }

  updateState = (value, ref) => {
    this.setState(state =>
      ({ ...state, valuesUpdated: true }));
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

  handleForm = ({ target }) => {
    this.setState(state =>
      ({ ...state, valuesUpdated: true }));
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
    if (this.state.valuesUpdated) {
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
    }
    this.setState(state =>
      ({ ...state, errors: errors }));
    return (errors.timeForm === '' && errors.repeatDays === '' && errors.actionAlarm === '' && errors.code === '');
  }

  handleDelete = () => {
    this.props.delete(this.props.alarm.id, this.props.thingId);
    this.setState(state =>
      ({ ...state, valuesUpdated: true }));
    this.props.hide();
  }

  handleSubmit = () => {
    if (this.validateRequiredData(this.state.data)) {
      this.props.update(this.state.alarm.id, this.props.thingId, this.state.data);
      this.setState(state =>
        ({ ...state, valuesUpdated: false }));
      this.props.hide();
    }
  }

  render() {
    const dow = this.props.alarm ? this.props.alarm.cron.dow : [];
    const code = this.props.alarm ? this.props.alarm.properties.code : '';
    const arm = this.props.alarm ? this.props.alarm.action : null;
    return (
      <Modal show={this.state.show} onHide={() => this.props.hide()}>
        <Modal.Header closeButton>Editar alarma</Modal.Header>
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
          <TimeForm
            updateParentState={this.updateState}
            defaultValue={this.getCompleteTime()}
          />
          <div className="repeat-container">
            <span>Repetir</span>
            <RepeatDays
              updateParentState={this.updateState}
              selectedDays={dow}
            />
          </div>
          <ActionAlarm
            updateParentState={this.updateState}
            action={arm}
          />
          <div className="input-container">
            <span>Código</span>
            <input
              type="password"
              maxLength="4"
              defaultValue={code}
              onChange={event => this.handleForm(event)}
            />
          </div>
          <div className="btn-container">
            <button
              className="btn btn-lg btn-primary btn-delete"
              onClick={() => this.handleDelete()}
            >
              Eliminar
            </button>
            <button
              className="btn btn-lg btn-primary"
              onClick={() => this.handleSubmit()}
            >Editar
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

EditAlarm.propTypes = {
  hide: PropTypes.func,
  show: PropTypes.bool,
  alarm: PropTypes.object,
  delete: PropTypes.func,
  thingId: PropTypes.string,
  update: PropTypes.func,
};


export default EditAlarm;
