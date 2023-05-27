import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateThingsConfiguration } from '../../actions/things';
import { getThingsList, getAgentsList, getAgentGeofence } from '../../selectors/LeftPanel.selector';
import ThingConfigurationPanel from './ThingConfigurationPanel';
import { getPreferences } from '../../actions/preferences';
import { getThingPreferences } from '../../selectors/preferences';

function mapStateToProps(state, ownProps) {
  const thingList = getThingsList(state).toJS();
  const thing = thingList.find(item => item.id === ownProps.match.params.thingId);
  const thingAgents = getAgentsList(state)
    .filter(agents => ownProps.match.params.thingId === agents.get('thing_id'));
  const geofenceList = getAgentGeofence(state);
  const geofence = geofenceList.find(geo => geo.get('thing_id') === ownProps.match.params.thingId);
  const speedLimit = thingAgents.find(agent => agent.get('type') === 'mrn:agent_type:speed_limit');

  const preferences = getThingPreferences(state);
  const thingPreferences = preferences[ownProps.match.params.thingId];

  return {
    name: thing && thing.name,
    type: thing && thing.type,
    geofenceLabel: geofence && geofence.get('label'),
    maxSpeed: speedLimit && speedLimit.toJS(),
    accumKilometers: thing && thing.mileage,
    thingId: thing && thing.id,
    thingPreferences,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateThingsConfiguration, getPreferences }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThingConfigurationPanel);
