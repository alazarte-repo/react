import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ForgotPasswordEmailForm from '../components/ForgotPasswordEmailForm';
import { forgotPasswordRequestCode } from '../actions/forgotPassword';


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ forgotPasswordRequestCode }, dispatch);
}

export default connect(null, mapDispatchToProps)(ForgotPasswordEmailForm);

