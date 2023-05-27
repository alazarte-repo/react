import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ThingCard from './ThingCard';
import agentsActions from '../../actions/agents';
import {
  getSelectedTripMadeId,
  getSelectedServiceNotification,
} from '../../selectors/Things.selector';
import { getThingAgents } from '../../selectors/LeftPanel.selector';
import toJS from '../../components/toJS';

function mapStateToProps(state, ownProps) {
  const agents = getThingAgents(state)(ownProps.id);

  return {
    selectedTrip: getSelectedTripMadeId(state),
    selectedServiceNotification: getSelectedServiceNotification(state),
    hasAlert: agents.some(data => !data.getIn(['current_status', 'normal'])),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...agentsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ThingCard));
