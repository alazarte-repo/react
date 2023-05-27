import React, { Component } from 'react';
import { Modal, FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DateTimeUtils from '../../utils/DateTimeUtils';

class ConfigService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      toggleDistance: false,
      toggleDate: false,
      changes: {},
      reminderConfig: [],
    };

    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleForms = this.handleForms.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        toggleDate: nextProps.toggleDate,
        toggleDistance: nextProps.reminder && nextProps.reminder.active,
        show: nextProps.show,
      });
    }
  }

  handleForms({ target }) {
    this.setState(state => ({
      ...state,
      changes: {
        ...this.state.changes,
        [target.name]: target.value,
      },
    }));
  }

  handleSubmit() {
    const reminderConfig = [];
    if ('days' in this.state.changes) {
      const changedDays = Number(this.state.changes.days);
      const lastServiceDate = this.props.reminder.done_at.date;
      reminderConfig.push({ value: changedDays, type: '/repeat/days' });
      reminderConfig.push({ value: DateTimeUtils.addDays(lastServiceDate, changedDays), type: '/notify_at/date' });
    }
    if ('mileage' in this.state.changes) {
      reminderConfig.push({ value: Number(this.state.changes.mileage), type: '/repeat/mileage' });
    }

    this.props.changeReminderConfig(
      reminderConfig,
      this.props.thingId,
      this.props.reminder.id,
    );
    this.props.hide('config_service');
  }

  handleDelete() {
    this.props.deleteReminder(this.props.thingId, this.props.reminder.id);
    this.props.hide('config_service');
  }

  render() {
    const thereIsReminder = !!this.props.reminder;
    const mileageValue = thereIsReminder ? this.props.reminder.repeat.mileage : 0;
    const daysValue = thereIsReminder ? this.props.reminder.repeat.days : 12;
    return (
      <Modal show={this.state.show && thereIsReminder} onHide={() => this.props.hide('config_service')} >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: 'auto' }}>
          <div className="config-modal">
            <div className="configuration-wrapper">
              <span>Realizar servicio cada</span>
              <InputGroup>
                <FormControl
                  name="mileage"
                  componentClass="input"
                  type="text"
                  defaultValue={mileageValue}
                  onChange={this.handleForms}
                />
                <InputGroup.Addon>km</InputGroup.Addon>
              </InputGroup>
            </div>
            <div className="configuration-wrapper">
              <span>Realizar servicio cada</span>
              <FormControl
                name="days"
                componentClass="select"
                className="month-select"
                placeholder="select"
                defaultValue={daysValue}
                onChange={this.handleForms}
              >
                <option value={60}>2 meses</option>
                <option value={120}>4 meses</option>
                <option value={150}>6 meses</option>
                <option value={240}>8 meses</option>
                <option value={360}>12 meses</option>
                <option value={540}>18 meses</option>
                <option value={720}>24 meses</option>
              </FormControl>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none' }}>
          <button onClick={this.handleDelete} className="btn btn-delete">
            Eliminar
          </button>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ConfigService.propTypes = {
  thingId: PropTypes.string,
  show: PropTypes.bool,
  reminder: PropTypes.object,
  title: PropTypes.string,
  toggleDate: PropTypes.bool,
  hide: PropTypes.func,
  deleteReminder: PropTypes.func,
  changeReminderConfig: PropTypes.func,
};


export default ConfigService;
