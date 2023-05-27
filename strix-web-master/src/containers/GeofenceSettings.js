import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildGeofences } from '../utils/geofences';
import { agentList, getGeofences } from '../selectors/RightPanel.selector';
import { deleteGeofence } from '../actions/geofences';
import GeofenceSettings from '../components/GeofenceSettings';


function mapStateToProps(state) {
  const geofences = getGeofences(state);
  const agents = agentList(state);
  return {
    geofences: buildGeofences(geofences, agents).toJS(),
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteGeofence }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(GeofenceSettings);
