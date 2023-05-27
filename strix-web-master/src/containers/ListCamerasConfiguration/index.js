import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCameras } from '../../actions/things';
import ListCamerasConfiguration from './ListCamerasConfiguration';
import toJS from '../../components/toJS';

function mapStateToProps(state, ownProps) {
  const selectedThing = state.getIn(['things', 'list'])
    .find(thing => thing.get('id') === ownProps.match.params.thingId);
  return {
    cameraIds: selectedThing && selectedThing.get('cameras'),
    camerasInfo: state.getIn(['cameras', 'list']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getCameras },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ListCamerasConfiguration));
