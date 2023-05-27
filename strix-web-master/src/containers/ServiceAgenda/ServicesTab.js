import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getThingsList } from '../../selectors/LeftPanel.selector';
import ServicesTab from '../../components/ServiceAgenda/ServicesTab';
import toJS from '../../components/toJS';
import { addReminders, changeReminderConfig, deleteReminder } from '../../actions/reminders';

function mapStateToProps(state, ownProps) {
  const selectedCardId = ownProps.match.params.thingId;
  const foundThing = getThingsList(state)
    .find(card => card.get('id') === selectedCardId);

  return {
    reminderTypes: state.getIn(['reminders', 'types']),
    reminders: state.getIn(['reminders', 'list']),
    thingId: selectedCardId,
    mileage: foundThing ? foundThing.get('mileage') : 0,
    thingSubtype: foundThing ? foundThing.get('subtype') : null,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeReminderConfig, addReminders, deleteReminder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ServicesTab));
