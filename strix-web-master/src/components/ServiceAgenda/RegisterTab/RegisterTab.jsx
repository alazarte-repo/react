import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from '../../DatePicker';

import './RegisterTab.scss';

class RegisterTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: (new Date()).toISOString(),
      mileage: 0,
      selectedServices: new Set(),
      datepickerFocused: false,
    };

    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePicker = this.changePicker.bind(this);
    this.handleMileageChange = this.handleMileageChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.onDatepickerFocus = this.onDatepickerFocus.bind(this);
    this.onDatepickerBlur = this.onDatepickerBlur.bind(this);
  }

  componentWillMount() {
    if (this.props.mileage > 0) {
      this.setState({ mileage: this.props.mileage });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mileage > 0) {
      this.setState({ mileage: nextProps.mileage });
    }

    nextProps.recentlyDone.forEach((doneService) => {
      if (this.state.selectedServices.has(doneService)) {
        this.state.selectedServices.delete(doneService);
      }
    });
    this.setState({ selectedServices: this.state.selectedServices });
  }

  shouldComponentUpdate() {
    // We update the component only when the datepicker is not focused/opened beacuse
    // if any prop changes, the component re-renders and the datetimepicker goes back
    // to the date saved in this.state.date
    return !this.state.datepickerFocused;
  }

  onDatepickerFocus() {
    this.setState({ datepickerFocused: true });
  }

  onDatepickerBlur() {
    this.setState({ datepickerFocused: false });
  }

  changePicker(newDate) {
    this.setState(state => ({ ...state, date: newDate }));
  }

  handleMileageChange({ target }) {
    this.setState(state => ({ ...state, mileage: target.value }));
  }

  handleCheckBoxChange({ target }) {
    if (this.state.selectedServices.has(target.id)) {
      this.state.selectedServices.delete(target.id);
    } else {
      this.state.selectedServices.add(target.id);
    }
    this.setState({ selectedServices: this.state.selectedServices });
  }

  handleSubmit(event) {
    event.preventDefault();
    const servicesPool = Array.from(this.state.selectedServices);
    this.props.markServiceAsDone(
      this.props.thingId,
      servicesPool,
      this.state,
    );
  }

  render() {
    return (
      <div className="register-tab-container">
        <div className="register-header">
          <h4>Datos del service realizado</h4>
          <button
            className="btn btn-primary pull-right"
            style={{ width: '20%' }}
            disabled={this.state.selectedServices.size === 0 || this.props.working}
            onClick={this.handleSubmit}
          >
            <div className="loading-container">
              { this.props.working && <i className="icon icon-spinner icon-spin loading-icon" /> }
              Guardar
            </div>
          </button>
        </div>
        <div>
          <form className="form-inline search-form">
            <div className="form-group">
              <div className="header-control">
                <span>Fecha</span>
                <DatePicker
                  pickerValue={this.state.date}
                  changePicker={this.changePicker}
                  id="dateField"
                  onFocus={this.onDatepickerFocus}
                  onBlur={this.onDatepickerBlur}
                />
              </div>
              <div className="header-control" key={this.props.mileage}>
                <span>Kilometraje</span>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleMileageChange}
                  defaultValue={this.state.mileage}
                />
              </div>
            </div>
          </form>
        </div>
        <Scrollbars style={{ height: '100%', width: '100%', padding: '10px' }} >
          {
            this.props.reminders
              .filter(reminder => !this.props.recentlyDone.has(reminder.id))
              .map(reminder => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-name">
                    <span>{ reminder.name }</span>
                  </div>
                  <input
                    className="pull-right modal-checkbox"
                    type="checkbox"
                    id={reminder.id}
                    onChange={this.handleCheckBoxChange}
                  />
                </div>
              ))
          }
        </Scrollbars>
      </div>
    );
  }
}

RegisterTab.propTypes = {
  thingId: PropTypes.string,
  markServiceAsDone: PropTypes.func,
  mileage: PropTypes.number,
  reminders: PropTypes.array,
  working: PropTypes.bool,
  recentlyDone: PropTypes.instanceOf(Set),
};

export default RegisterTab;

