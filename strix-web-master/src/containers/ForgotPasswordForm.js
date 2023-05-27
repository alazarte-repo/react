import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { resetPassword } from '../actions/forgotPassword';

function mapStateToProps(state) {
  return ({
    forgotPassStep: state.getIn(['forgotPassword', 'forgotPassStep']),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ resetPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);

