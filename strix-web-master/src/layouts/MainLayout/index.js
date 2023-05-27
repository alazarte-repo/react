import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetActionStatus } from '../../actions/user';
import { forceRefresh } from '../../actions/appState';
import toJS from '../../components/toJS';
import MainLayout from './MainLayout';

function mapStateToProps(state) {
  return {
    isAppOffline: state.getIn(['appStatus', 'offline']),
    success: state.getIn(['actionStatus', 'success']),
    error: state.getIn(['actionStatus', 'error']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    forceRefresh,
    resetActionStatus,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(MainLayout));
