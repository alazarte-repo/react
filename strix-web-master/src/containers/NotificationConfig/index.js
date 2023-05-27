import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getThingPreferences, getThingType } from '../../selectors/preferences';
import NotificationConfig from './NotificationConfig';
import { updatePreferences } from '../../actions/preferences';


function mapStateToProps(state, ownProps) {
  const thingId = ownProps.match.params.thingId;
  const preferences = getThingPreferences(state);
  const thingPreferences = preferences[thingId];
  const thingtype = getThingType(state, thingId);

  return {
    thingPreferences,
    thingtype,
    thingId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePreferences }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationConfig);

