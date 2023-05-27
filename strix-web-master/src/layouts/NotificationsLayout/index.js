import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotificationList } from '../../selectors/NavBar.selector';
import NotificationsLayout from './NotificationsLayout';
import toJS from '../../components/toJS';
import {
  notificationScreenOpened,
  notificationScreenClosed,
  notificationModalClosed,
  markNotificationAsRead,
} from '../../actions/topBar';

function mapStateToProps(state) {
  return {
    list: getNotificationList(state),
    unreadList: state.getIn(['notifications', 'unreadList']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    notificationScreenOpened,
    notificationScreenClosed,
    notificationModalClosed,
    markNotificationAsRead,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(NotificationsLayout));

