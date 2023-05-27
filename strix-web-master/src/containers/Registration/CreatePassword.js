import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreatePassword from '../../components/CreatePassword';
import { createPassword } from '../../actions/registration';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPassword }, dispatch);
}

export default connect(null, mapDispatchToProps)(CreatePassword);

