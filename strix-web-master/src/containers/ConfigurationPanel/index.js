import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getThingsList } from '../../selectors/LeftPanel.selector';
import ConfigurationPanel from './ConfigurationPanel';
import { resetPreferences } from '../../actions/preferences';
import toJS from '../../components/toJS';

function mapStateToProps(state) {
  return {
    thingsProps: getThingsList(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetPreferences,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConfigurationPanel));
