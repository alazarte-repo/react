import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications from '../components/Notifications';
import toJS from '../components/toJS';
import {
  getNotifications,
  markNotificationAsRead,
  getUnreadNotifications,
  notificationModalOpened,
  notificationModalClosed,
} from '../actions/topBar';
import { getNotificationList } from '../selectors/NavBar.selector';

function mapStateToProps(state) {
  return {
    notifications: getNotificationList(state),
    unreadNotifications: state.getIn(['notifications', 'unreadNumber']),
    unreadList: state.getIn(['notifications', 'unreadList']),
    page: state.getIn(['notifications', 'page']),
    loading: state.getIn(['notifications', 'loading']),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getNotifications,
      markNotificationAsRead,
      getUnreadNotifications,
      notificationModalOpened,
      notificationModalClosed,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(Notifications));
