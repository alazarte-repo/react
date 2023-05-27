import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toJS from '../../components/toJS';
import HomeControlConfig from './HomeControlConfig';

import {
  solidmationGetStatus,
  solidmationUnlinkAccount,
  solidmationSyncHomes,
  solidmationPairHomes,
  solidmationLogin,
} from '../../actions/thirdPartyServices';

function mapStateToProps(state) {
  return {
    status: state.getIn(['thirdPartyServices', 'solidmation', 'status']),
    errorMessage: state.getIn(['thirdPartyServices', 'solidmation', 'errorMessage']),
    homeList: state.getIn(['thirdPartyServices', 'solidmation', 'list']),
    username: state.getIn(['thirdPartyServices', 'solidmation', 'username']),
    homeDetail: state.getIn(['thirdPartyServices', 'solidmation', 'homeDetail']),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    solidmationGetStatus,
    solidmationUnlinkAccount,
    solidmationSyncHomes,
    solidmationPairHomes,
    solidmationLogin,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomeControlConfig));
