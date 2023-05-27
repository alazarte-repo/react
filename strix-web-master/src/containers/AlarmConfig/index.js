import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createAlarm,
  editAlarm,
  getAlarms,
  deleteAlarm,
  updateAlarm,
} from '../../actions/alarms';
import AlarmConfig from './AlarmConfig';

function mapStateToProps(state, { match }) {
  const alarmsList = state.getIn(['tasks', 'list']);
  return {
    thingId: match.params.thingId,
    alarms: alarmsList && alarmsList.toJS(),
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { createAlarm, editAlarm, getAlarms, deleteAlarm, updateAlarm },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmConfig);
