import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceAgendaLayout from './ServiceAgendaLayout';
import { getReminders, remidersReset } from '../../actions/reminders';
import { getThingsList } from '../../selectors/LeftPanel.selector';
import toJS from '../../components/toJS';
import { selectServiceNotification } from '../../actions/serviceNotifications';

function mapStateToProps(state, ownProps) {
  const selectedCardId = ownProps.match.params.thingId;
  const foundThing = getThingsList(state)
    .find(card => card.get('id') === selectedCardId);

  return {
    loading: state.getIn(['reminders', 'loading']),
    selectedTab: state.getIn(['serviceAgenda', 'selectedTab']),
    mileage: foundThing ? foundThing.get('mileage') : 0,
    thingId: selectedCardId,
    path: ownProps.match.path,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getReminders,
    remidersReset,
    closeAgenda: selectServiceNotification,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(ServiceAgendaLayout));
