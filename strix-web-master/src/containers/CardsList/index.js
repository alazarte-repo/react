import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CardsList from './CardsList';
import { selectCard, expandCard } from '../../actions/leftPanel';
import { sendEvent } from '../../actions/analytics';
import { getThingsList, getSelectedCardId, getSharedLocationCard } from '../../selectors/LeftPanel.selector';
import { isThingsFirstLoad } from '../../selectors/Things.selector';
import AnalyticEvent, { AnalyticCategories } from '../../constants/analyticEvents';
import toJS from '../../components/toJS';

const loyalityViewEvent = () =>
  sendEvent(AnalyticEvent.LOYALITY_VIEW, AnalyticCategories.View);

function mapStateToProps(state) {
  return {
    firstLoad: isThingsFirstLoad(state),
    things: getThingsList(state),
    selectedCard: getSelectedCardId(state),
    sharedLocationCard: getSharedLocationCard(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectCard,
      expandCard,
      loyalityViewEvent,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CardsList));
