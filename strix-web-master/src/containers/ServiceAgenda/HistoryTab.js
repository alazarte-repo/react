import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remindersGetHistoryItems } from '../../actions/reminders';
import HistoryTab from '../../components/ServiceAgenda/HistoryTab';
import toJS from '../../components/toJS';

function mapStateToProps(state, ownProps) {
  return {
    services: state.getIn(['reminders', 'history']),
    page: state.getIn(['reminders', 'historyPage']),
    loading: state.getIn(['reminders', 'historyLoading']),
    noMorePages: state.getIn(['reminders', 'historyNoMorePages']),
    thingId: ownProps.match.params.thingId,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getMoreItems: remindersGetHistoryItems,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(toJS(HistoryTab));
