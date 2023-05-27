import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../selectors/NavBar.selector';
import { changePin } from '../../actions/user';
import ChangePin from './ChangePin';
import toJS from '../../components/toJS';

function mapStateToProps(state) {
  return ({ user: getUser(state) });
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ChangePin));
