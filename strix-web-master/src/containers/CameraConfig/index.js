import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConfigurationCamera from './ConfigurationCamera';
import { deleteCamera, modifyCamera } from '../../actions/things';
import toJS from '../../components/toJS';

function mapStateToProps(state, ownProps) {
  const cameras = state.getIn(['cameras', 'list']);
  const selectedCamera = cameras.find(camera => camera.get('id') === ownProps.match.params.cameraId);
  return {
    label: selectedCamera.get('label'),
  };
}

function mapDispacthToProps(dispatch) {
  return bindActionCreators({
    deleteCamera,
    modifyCamera,
  },
  dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(toJS(ConfigurationCamera));
