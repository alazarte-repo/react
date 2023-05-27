import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormLogin from '../components/FormLogin';
import { changeForm, loginRequest } from '../actions/login';
import toJS from '../components/toJS';


function mapStateToProps(state) {
  return {
    error: state.getIn(['login', 'error']),
    data: state.getIn(['login', 'formState']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeForm, onSubmit: loginRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(FormLogin));

