import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSelectedTripDetails } from '../../selectors/RightPanel.selector';
import { selectTripDetails } from '../../actions/trips';
import AnalyticEvent, { AnalyticCategories } from '../../constants/analyticEvents';
import TripDetails from './TripDetails';
import { sendEvent } from '../../actions/analytics';
import DateTimeUtils from '../../utils/DateTimeUtils';
import toJS from '../../components/toJS';

function sendTripViewEvent(startDate) {
  if (startDate != null) {
    const days = DateTimeUtils.differenceInDays(new Date(), new Date(startDate));
    return sendEvent(AnalyticEvent.VEHICLE_TRIP_VIEW, AnalyticCategories.Vehicle, 'Days', days);
  }
  return { type: 'DUMMY_ACTION' };
}

function mapStateToProps(state, ownProps) {
  const tripDetails = getSelectedTripDetails(state);
  return {
    polylinePath: tripDetails.get('polylinePath'),
    polylineMarkers: tripDetails.get('polylineMarkers'),
    max_speed: tripDetails.get('max_speed'),
    mileage: tripDetails.get('mileage'),
    durationHumanized: tripDetails.get('durationHumanized'),
    date: tripDetails.get('tripDate'),
    selectedTripId: tripDetails.get('id'),
    startDate: tripDetails.getIn(['start', 'timestamp']),
    loading: state.getIn(['trips', 'loadingTrip']),
    tripId: ownProps.match.params.tripId,
    thingId: ownProps.match.params.thingId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTripDetails,
    sendTripViewEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(TripDetails));
