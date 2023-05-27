import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterAccount from './RegisterAccount';
import {
  createAccount,
  checkUsername,
  previousStep,
} from '../../actions/account';
import toJS from '../../components/toJS';

function mapStateToProps(state) {
  return {
    creatingAccount: state.getIn(['account', 'creatingAccount']),
    checkingUsername: state.getIn(['account', 'checkingUsername']),
    error: state.getIn(['account', 'error']),
    step: state.getIn(['account', 'registerAccountStep']),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    createAccount,
    checkUsername,
    previousStep,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(RegisterAccount));
