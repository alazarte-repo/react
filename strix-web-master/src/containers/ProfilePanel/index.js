import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../selectors/NavBar.selector';
import { requestLogout } from '../../actions/user';
import ProfilePanel from './ProfilePanel';
import toJS from '../../components/toJS';

function mapStateToProps(state, { match }) {
  return {
    url: match.url,
    user: getUser(state),
    customerCarePhone: state.getIn(['userData', 'countryInfo', 'customerCarePhone']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestLogout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProfilePanel));
