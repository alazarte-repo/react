import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfileLayout from './ProfileLayout';
import { getDevices } from '../../actions/user';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDevices,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProfileLayout);
