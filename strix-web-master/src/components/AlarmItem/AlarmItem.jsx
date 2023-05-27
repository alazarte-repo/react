import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.scss';


class AlarmItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
    };
  }

  handleClick = () => {
    this.props.toggleEditAlarm(this.props.id);
  }

  render() {
    const days = this.props.days
      .map((day) => {
        switch (day) {
          case 'monday':
            return 'Lunes';
          case 'tuesday':
            return 'Martes';
          case 'wednesday':
            return 'Miercoles';
          case 'thursday':
            return 'Jueves';
          case 'friday':
            return 'Viernes';
          case 'saturday':
            return 'Sábado';
          case 'sunday':
            return 'Domingo';
          default: return null;
        }
      });
    const time = moment(this.props.time, ['H:m']).format('hh:mm A');
    return (
      <div className="config-alarm-item-container">
        {this.props.isArmed ? <i className="icon icon-alarm-on" /> : <i className="icon icon-alarm-off" />}
        <div className="time-days-container">
          <span>{time}</span>
          <div className="days-container">
            <span>{days.lenght === 1 ? days[0] : days.join(', ')}</span>
          </div>
        </div>
        <i className="icon icon-arrow" onClick={this.handleClick} />
      </div>
    );
  }
}
AlarmItem.propTypes = {
  days: PropTypes.array,
  toggleEditAlarm: PropTypes.func,
  time: PropTypes.string,
  id: PropTypes.string,
  isArmed: PropTypes.bool,
};

export default AlarmItem;
