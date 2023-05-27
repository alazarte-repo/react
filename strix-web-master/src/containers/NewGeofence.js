import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createBounds } from 'utils/map';
import { getThingsCenters } from '../selectors/Things.selector';
import { thingsList } from '../selectors/RightPanel.selector';
import { createGeofence } from '../actions/geofences';
import NewGeofence from '../components/NewGeofence';
import toJS from '../components/toJS';

function mapStateToProps(state) {
  const things = thingsList(state);
  const markers = things.map(thing => ({
    thingId: thing.get('id'),
    position: {
      lat: thing.getIn(['center', 'lat']),
      lng: thing.getIn(['center', 'lng']),
    },
    key: thing.get('id'),
    type: thing.get('type'),
    defaultAnimation: 3,
  }));
  const thingCenters = getThingsCenters(state);

  return {
    thingCenters,
    markers,
    thingsBounds: createBounds(thingCenters),
    isLoading: state.getIn(['geofences', 'createGeofenceIsLoading']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createGeofence }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(toJS(NewGeofence));
