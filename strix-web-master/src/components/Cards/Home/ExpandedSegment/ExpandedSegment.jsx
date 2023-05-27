import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlarmNotification from '../../shared/AlarmNotification';
import AlarmHistory from './AlarmHistory';
import './ExpandedSegment.scss';


class ExpandedSegment extends Component {
  state = { show: false, url: '', showStream: false }

  componentWillMount() {
    this.props.getSignals(this.props.thingId);
  }

  render() {
    return (
      <div className="home-expanded-container">
        {
          this.props.alarmState.online &&
          <AlarmNotification
            title="Programacion de alarmas"
            data="Ver todas las configuraciones"
            icon="alarm-calendar"
            thingId={this.props.thingId}
          />
        }
        <AlarmHistory signals={this.props.signals} />
      </div>
    );
  }
}

ExpandedSegment.propTypes = {
  thingId: PropTypes.string,
  getSignals: PropTypes.func,
  alarmState: PropTypes.object,
  signals: PropTypes.object,
};

export default ExpandedSegment;
