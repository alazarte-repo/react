import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../selectors/NavBar.selector';
import { changePassword } from '../../actions/user';
import ChangePassword from './ChangePassword';

function mapStateToProps(state) {
  const user = getUser(state).toJS();
  return ({ user });
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
