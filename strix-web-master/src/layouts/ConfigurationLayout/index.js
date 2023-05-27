import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConfigurationLayout from './ConfigurationLayout';
import { getAgents } from '../../actions/agents';
import { updateGeofences } from '../../actions/geofences';
import { updateThings } from '../../actions/things';
import { selectCard } from '../../actions/leftPanel';
import { isLoading } from '../../selectors/LeftPanel.selector';


function mapStateToProps(state) {
  return {
    isLoading: isLoading(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAgents, updateGeofences, updateThings, selectCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationLayout);
