import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAllGeofences } from '../../../actions/leftPanel';
import { selectLocationId } from '../../../actions/flex';
import { getSelectedLocationId, getFlexs } from '../../../selectors/Things.selector';
import { Flex } from '../../../components/Cards';
import { getSelectedThingGeofences } from '../../../selectors/RightPanel.selector';
import { getThingAgents } from '../../../selectors/LeftPanel.selector';
import toJS from '../../../components/toJS';

function mapStateToProps(state, ownProps) {
  return {
    selectedLocationId: getSelectedLocationId(state),
    locations: getFlexs(state),
    dateRange: state.getIn(['trips', 'dateRange']),
    thingGeofences: getSelectedThingGeofences(state),
    agents: getThingAgents(state)(ownProps.id),
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ showAllGeofences, selectLocationId }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(Flex));
