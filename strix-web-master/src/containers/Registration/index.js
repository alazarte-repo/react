import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegistrationForm from './RegistrationForm';


function mapStateToProps(state) {
  return {
    registrationStep: state.getIn(['registration', 'registrationStep']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

