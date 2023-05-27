import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAgentsList } from '../../selectors/LeftPanel.selector';
import {
  createAgentSpeedLimit,
  updateSpeedLimitAgent,
  removeAgentSeedLimit,
} from '../../actions/agents';

import MaxSpeedConfig from './MaxSpeedConfig';

function mapStateToProps(state, ownProps) {
  const agentMaxSpeed = getAgentsList(state)
    .find(agents => ownProps.match.params.thingId === agents.get('thing_id') &&
    agents.get('type') === 'mrn:agent_type:speed_limit');
  return {
    agentId: agentMaxSpeed && agentMaxSpeed.get('id'),
    agent: agentMaxSpeed && agentMaxSpeed.toJS(),
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createAgentSpeedLimit,
    updateSpeedLimitAgent,
    removeAgentSeedLimit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MaxSpeedConfig);
