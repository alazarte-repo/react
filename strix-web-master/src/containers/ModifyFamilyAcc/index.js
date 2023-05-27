import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modifyFamilyUser } from '../../actions/familyAcc';
import ModifyFamilyAcc from './ModifyFamilyAcc';
import toJS from '../../components/toJS';

function mapStateToProps(state, ownProps) {
  const familyMembers = state.getIn(['userData', 'users']);
  const familyMember = familyMembers.find(member =>
    member.get('id') === ownProps.match.params.familyMemberId,
  );
  return {
    firstname: familyMember.get('first_name'),
    lastname: familyMember.get('last_name'),
    username: familyMember.get('username'),
    id: familyMember.get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ modifyFamilyUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ModifyFamilyAcc));
