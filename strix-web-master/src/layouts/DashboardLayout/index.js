import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardLayout from './DashboardLayout';
import { getAgents } from '../../actions/agents';
import { updateGeofences } from '../../actions/geofences';
import { updateThings } from '../../actions/things';
import { startBackgroundSync } from '../../actions/delayedDispatcher';
import { selectCard } from '../../actions/leftPanel';
import { updateSharedLocations } from '../../actions/sharedLocations';
import { isThingsFirstLoad } from '../../selectors/Things.selector';
import { getThingsList, getSharedLocationCard } from '../../selectors/LeftPanel.selector';
import toJS from '../../components/toJS';

function mapStateToProps(state) {
  return {
    userData: state.getIn(['userData', 'user']),
    isLoading: state.getIn(['things', 'isLoading']),
    firstLoad: isThingsFirstLoad(state),
    things: getThingsList(state),
    sharedLocations: getSharedLocationCard(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAgents,
    updateGeofences,
    updateThings,
    selectCard,
    updateSharedLocations,
    startBackgroundSync,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(DashboardLayout));
