import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyUsername } from '../../actions/account';
import toJS from '../../components/toJS';
import VerifyUsername from './VerifyUsername';

function mapStateToProps(state, ownProps) {
  return {
    username: ownProps.match.params.username,
    token: ownProps.match.params.token,
    verifying: state.getIn(['account', 'verifyingUsername']),
    error: state.getIn(['account', 'verifyUsernameError']),
    errorMessage: state.getIn(['account', 'verifyUsernameErrorMessage']),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    verifyUsername,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(VerifyUsername));
