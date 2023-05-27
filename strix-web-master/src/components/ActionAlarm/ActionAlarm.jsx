import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AlarmActions from '../../constants/alarmActions';
import './styles.scss';

class ActionAlarm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: props.action,
    };
  }

  makeAction = (action) => {
    if (action === this.state.active) {
      return this.setState({ active: null }, () => this.props.updateParentState(null, ''));
    }

    switch (action) {
      case AlarmActions.Arm:
        return this.setState({ active: action }, () => this.props.updateParentState(action, ''));
      case AlarmActions.Disarm:
        return this.setState({ active: action }, () => this.props.updateParentState(action, ''));
      default:
        return this.setState({ active: null }, () => this.props.updateParentState(null, ''));
    }
  }

  render() {
    return (
      <div className="action-container">
        <span> Acción</span>
        <div
          className={this.state.active === AlarmActions.Arm ? 'active' : null}
          style={{ marginLeft: '5px' }}
          onClick={() => this.makeAction(AlarmActions.Arm)}
        >
          <span>Armar alarma</span>
        </div>
        <div
          className={this.state.active === AlarmActions.Disarm ? 'active' : null}
          onClick={() => this.makeAction(AlarmActions.Disarm)}
        >
          <span>Desarmar alarma</span>
        </div>
      </div>
    );
  }
}


ActionAlarm.propTypes = {
  updateParentState: PropTypes.func,
  action: PropTypes.string,
};

export default ActionAlarm;
