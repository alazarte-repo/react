import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendEvent } from '../../actions/analytics';
import AnalyticEvent, { AnalyticCategories } from '../../constants/analyticEvents';
import Login from './Login';

function sendLoginShownAnalyticsEvent() {
  return sendEvent(AnalyticEvent.LOGIN_SHOWN, AnalyticCategories.User);
}

function mapStateToProps(state) {
  return ({
    lostPassword: state.getIn(['forgotPassword', 'forgotPassEmailStatus']),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendLoginShownAnalyticsEvent,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

