import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreatePin from '../../components/CreatePin';
import { createPin } from '../../actions/registration';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPin }, dispatch);
}

export default connect(null, mapDispatchToProps)(CreatePin);

