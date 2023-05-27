import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../../store';
import { NewAlarm, EditAlarm } from '../../components/Modals';
import AlarmItem from '../../components/AlarmItem';
import './AlarmConfig.scss';

const arrowStyles = {
  transform: 'rotate(180deg)',
  textDecoration: 'none',
  fontSize: '18px',
  color: 'inherit',
  marginRight: '20px',
  cursor: 'pointer',
};
class AlarmConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewAlarmModal: false,
      showEditAlarm: false,
      form: '',
      alarmSelected: '',
    };
  }

  componentWillMount() {
    this.props.getAlarms(this.props.thingId);
  }

  toggleNewAlarmModal = () => {
    this.setState(state => ({ ...state, showNewAlarmModal: !this.state.showNewAlarmModal }));
  }

  toggleEditAlarm = (alarmId) => {
    this.setState(state => ({
      ...state,
      showEditAlarm: !this.state.showEditAlarm,
      alarmSelected: alarmId,
    }));
  }

  render() {
    const alarmObject = this.props.alarms.find(alarm => alarm.id === this.state.alarmSelected);
    return (
      <div className="things-config-container alarm-config-container">
        <div className="title-container" >
          <a onClick={history.goBack} style={arrowStyles}>
            <i className="icon icon-arrow" />
          </a>
          <h1 className="title-right-panel"> Configuracion Alarmas </h1>
        </div>
        <div className="add-alarm-container">
          <span>Agregar nueva alarma</span>
          <div onClick={this.toggleNewAlarmModal}>
            <i className="icon icon-add-sign" />
          </div>
          <NewAlarm
            thingId={this.props.thingId}
            createAlarm={this.props.createAlarm}
            show={this.state.showNewAlarmModal}
            hide={this.toggleNewAlarmModal}
          />
        </div>
        {this.props.alarms && this.props.alarms
          .map(alarm =>
            (<AlarmItem
              thingId={this.props.thingId}
              toggleEditAlarm={this.toggleEditAlarm}
              days={alarm.cron.dow}
              time={`${alarm.cron.hour}:${alarm.cron.minutes}`}
              isArmed={alarm.action === 'arm'}
              id={alarm.id}
              key={alarm.id}
              update={this.props.editAlarm}
            />))}
        <EditAlarm
          delete={this.props.deleteAlarm}
          thingId={this.props.thingId}
          alarm={alarmObject}
          show={this.state.showEditAlarm}
          hide={this.toggleEditAlarm}
          update={this.props.editAlarm}
        />
      </div>
    );
  }
}
AlarmConfig.propTypes = {
  getAlarms: PropTypes.func,
  alarms: PropTypes.array,
  thingId: PropTypes.string,
  createAlarm: PropTypes.func,
  deleteAlarm: PropTypes.func,
  editAlarm: PropTypes.func,
};

export default AlarmConfig;
