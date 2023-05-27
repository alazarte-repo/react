import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addOrModifyFamilyUser } from '../../actions/familyAcc';
import AddFamilyAcc from './AddFamilyAcc';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addOrModifyFamilyUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddFamilyAcc);
