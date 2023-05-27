import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { homeControlSwitch } from '../../actions/things';
import HomeControl from './HomeControl';

function mapStateToProps(state, { match }) {
  return {
    homeControlThings: state.getIn(['homeControl', 'things']).get(match.params.thingId),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ homeControlSwitch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeControl);
