import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserInfo from '../components/UserInfo';
import toJS from '../components/toJS';
import { getUserData, requestLogout } from '../actions/user';
import { getUser, getFullName } from '../selectors/NavBar.selector';

function mapStateToProps(state) {
  return {
    user: getUser(state),
    name: getFullName(state),
    device: state.getIn(['login', 'device']),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData,
    requestLogout,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(UserInfo));
