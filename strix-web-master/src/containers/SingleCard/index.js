import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SingleCard from './SingleCard';
import { selectCard, expandCard } from '../../actions/leftPanel';
import { selectTripDetails, showTripList } from '../../actions/trips';
import { getThingsList } from '../../selectors/LeftPanel.selector';
import { getLocalHistory } from '../../actions/flex';

function mapStateToProps(state, ownProps) {
  const thingById = getThingsList(state).find(
    thing => thing.get('id') === ownProps.match.params.thingId,
  );

  return {
    thing: thingById && thingById.toJS(),
    loading: state.getIn(['leftPanel', 'loading']),
    loadingMessage: state.getIn(['leftPanel', 'loadingMessage']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectCard,
      expandCard,
      selectTripDetails,
      showTripList,
      getLocalHistory,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard);
