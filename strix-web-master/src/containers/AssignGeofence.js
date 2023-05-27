import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildGeofences, returnGeofences } from '../utils/geofences';
import { agentList, getGeofences, thingsList } from '../selectors/RightPanel.selector';
import { assignAgentGeofence, deactivateGeofence, updateGeofence } from '../actions/agents';
import AgentType from '../constants/agentType';
import AssignGeofence from '../components/AssingGeofence';
import toJS from '../components/toJS';


function mapStateToProps(state, ownProps) {
  const thingId = ownProps.match.params.thingId;
  const things = thingsList(state);
  const thing = things.find(v => v.get('id') === thingId);
  const geofences = getGeofences(state);
  const agents = agentList(state);
  const thingGeofences = returnGeofences(thingId, agents);
  const agent = agents.find(a =>
    a.get('thing_id') === thingId && a.get('type') === AgentType.Geofence,
  );
  return {
    things,
    thingId,
    thing,
    agent,
    thingGeofences,
    assingGeofenceLoading: state.getIn(['agents', 'assingGeofenceLoading']),
    geofences: buildGeofences(geofences, agents),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    assignAgentGeofence,
    deactivateGeofence,
    updateGeofence,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AssignGeofence));
