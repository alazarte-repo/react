import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSelectedLocation, getAllLocations } from '../selectors/RightPanel.selector';
import { selectLocation, resetLocation } from '../actions/flex';

import LocationMap from '../components/Maps/LocationMap';

function mapStateToProps(state, ownProps) {
  const selectedDate = ownProps.match.params.date.replace('#', '');
  const selectedLocation = getSelectedLocation(state).toJS();
  const locations = getAllLocations(state).toJS().filter(l => l.dateUrl === selectedDate);

  return {
    locations,
    selectedLocation,
    selectedDate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectLocation, resetLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationMap);
