import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotificationList } from '../../selectors/NavBar.selector';
import NotificationDetails from './NotificationDetails';
import toJS from '../../components/toJS';
import {
  getNotifications,
} from '../../actions/topBar';

function mapStateToProps(state, { match }) {
  return {
    notification: getNotificationList(state).find(n => n.get('id') === match.params.notificationId),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNotifications,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(NotificationDetails));
