import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showServicePanel } from '../actions/menuPanel';
import MenuPanel from '../components/Menu';

function mapStateToProps(state) {
  return {
    operationsPhoneNumber: state.getIn(['userData', 'countryInfo', 'operationsCentrePhone']),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ showServicePanel }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuPanel);
