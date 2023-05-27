import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterTab from '../../components/ServiceAgenda/RegisterTab';
import { getThingsList } from '../../selectors/LeftPanel.selector';
import { markServiceAsDone } from '../../actions/reminders';
import toJS from '../../components/toJS';

function mapStateToProps(state, ownProps) {
  const thingId = ownProps.match.params.thingId;
  const foundThing = getThingsList(state)
    .find(card => card.get('id') === thingId);

  return {
    thingId,
    mileage: foundThing ? foundThing.get('mileage') : 0,
    reminders: state.getIn(['reminders', 'list']),
    working: state.getIn(['reminders', 'registerWorking']),
    recentlyDone: state.getIn(['reminders', 'recentlyDone']),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ markServiceAsDone }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(RegisterTab));
