import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotificationList } from '../../selectors/NavBar.selector';
import NotificationList from './NotificationList';
import toJS from '../../components/toJS';
import {
  getNotifications,
  notificationScreenOpened,
  notificationScreenClosed,
} from '../../actions/topBar';

function mapStateToProps(state, { match }) {
  return {
    list: getNotificationList(state),
    page: state.getIn(['notifications', 'page']),
    loading: state.getIn(['notifications', 'loading']),
    selectedId: match.params.notificationId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNotifications,
    notificationScreenOpened,
    notificationScreenClosed,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(NotificationList));
