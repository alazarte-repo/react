import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAllGeofences } from '../../../actions/leftPanel';
import { selectServiceNotification } from '../../../actions/serviceNotifications';
import { getSelectedTripId, isFuelCutPolling } from '../../../selectors/Things.selector';
import agentActions from '../../../actions/agents';
import { Vehicle } from '../../../components/Cards';
import { getCurrentSafeZone } from '../../../utils/geofences';
import AgentType from '../../../constants/agentType';
import { getThingAgents } from '../../../selectors/LeftPanel.selector';
import { getThingGeofences } from '../../../selectors/RightPanel.selector';
import {
  fuelCutCheckRunningAction,
  executeFuelCutAction,
} from '../../../actions/things';
import {
  selectTrip,
  selectTripDetails,
  changeRangeSegment,
  showTripList,
  resetTripsList,
} from '../../../actions/trips';
import toJS from '../../../components/toJS';

function mapStateToProps(state, ownProps) {
  const agents = getThingAgents(state)(ownProps.id);
  const geofenceAgent = agents.find(agent => agent.get('type') === AgentType.Geofence);
  return {
    availableTrips: state.getIn(['trips', 'list', ownProps.id]),
    selectedTripId: getSelectedTripId(state),
    dateRange: state.getIn(['trips', 'dateRange']),
    fuelCutPolling: isFuelCutPolling(state)(ownProps.id),
    thingGeofences: getThingGeofences(state)(ownProps.id),
    currentSafeZone: getCurrentSafeZone(geofenceAgent, getThingGeofences(state)(ownProps.id)),
    agents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      agentActions,
      showAllGeofences,
      selectTrip,
      selectServiceNotification,
      selectTripDetails,
      changeRangeSegment,
      showTripList,
      resetTripsList,
      fuelCutCheckRunningAction,
      fuelExecuteAction: executeFuelCutAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Vehicle));
