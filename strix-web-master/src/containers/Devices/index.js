import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { revoqueDevice } from '../../actions/user';
import toJS from '../../components/toJS';
import Devices from './Devices';

function mapStateToProps(state) {
  return {
    deviceList: state.getIn(['userData', 'devices']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ revoqueDevice }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Devices));
