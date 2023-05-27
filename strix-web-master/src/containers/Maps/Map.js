import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildGeofences } from 'utils/geofences';
import { selectCard } from '../../actions/leftPanel';
import {
  agentList,
  selectedThingId,
  getSelectedThingGeofences,
  isLoading,
  getAllMarkers,
} from '../../selectors/RightPanel.selector';
import { DefaultMap } from '../../components/Maps';
import toJS from '../../components/toJS';

function mapStateToProps(state) {
  const markers = getAllMarkers(state);
  return {
    markers,
    selectedThingId: selectedThingId(state),
    geofences: selectedThingId(state) !== '-1' && !isLoading(state)
      ? buildGeofences(getSelectedThingGeofences(state), agentList(state))
      : undefined,
    zoom: 25,
    selected: true,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(DefaultMap));
