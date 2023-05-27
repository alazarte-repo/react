import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FamilyAccountConfig from './FamilyAccountConfig';
import { getUser, getUsers } from '../../selectors/NavBar.selector';
import toJS from '../../components/toJS';
import {
  getFamilyUsers,
  deleteFamilyUser,
  resetAddUserError,
} from '../../actions/familyAcc';

function mapStateToProps(state) {
  return {
    user: getUser(state),
    familyUsers: getUsers(state),
    error: state.getIn(['userData', 'addFamilyUserError']),
    loading: state.getIn(['userData', 'loadingNewFamilyUser']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getFamilyUsers,
    deleteFamilyUser,
    resetAddUserError,
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(FamilyAccountConfig));
