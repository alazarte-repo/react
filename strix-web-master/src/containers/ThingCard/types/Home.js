import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import thingsActions from '../../../actions/things';
import { getSignals, isAlarmLoading, getAlarmError } from '../../../selectors/Things.selector';
import { getThingAgents } from '../../../selectors/LeftPanel.selector';
import { Home } from '../../../components/Cards';
import { notifyError } from '../../../actions/actionStatus';
import { sendEvent } from '../../../actions/analytics';
import AnalyticEvent, { AnalyticCategories } from '../../../constants/analyticEvents';
import toJS from '../../../components/toJS';

const cameraStreamViewEvent = () =>
  sendEvent(AnalyticEvent.CAMERA_STREAM_VIEW, AnalyticCategories.Alarm);

function mapStateToProps(state, ownProps) {
  return {
    agents: getThingAgents(state)(ownProps.id),
    dateRange: state.getIn(['trips', 'dateRange']),
    pin: state.getIn(['userData', 'user', 'security_pin']),
    signals: getSignals(state),
    camerasInfo: state.getIn(['cameras', 'list']),
    homeControlsInfo: state.getIn(['homeControl', 'things']).get(ownProps.id),
    alarmError: getAlarmError(state)(ownProps.id),
    isAlarmLoading: isAlarmLoading(state)(ownProps.id),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...thingsActions,
    notifyError,
    cameraStreamViewEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Home));
