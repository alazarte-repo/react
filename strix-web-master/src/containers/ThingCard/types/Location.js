import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Location from '../../../components/Cards/Location';
import { selectCard } from '../../../actions/leftPanel';
import { getFamilyMembers, getSelectedCardId } from '../../../selectors/LeftPanel.selector';
import toJS from '../../../components/toJS';

function mapStateToProps(state) {
  return {
    familyUsers: getFamilyMembers(state),
    selectedMember: getSelectedCardId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMember: selectCard,
    },
    dispatch,
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(toJS(Location));
