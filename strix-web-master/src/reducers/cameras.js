import { fromJS } from 'immutable';
import { serializeCameraPlaceholder } from '../serializers/camera';
import {
  GET_CAMERAS,
  GET_CAMERAS_SUCCESS,
  DELETE_CAMERA_SUCCESS,
  UPDATE_CAMERA_SUCCESS,
} from '../constants';

const initialState = fromJS({
  list: [],
  firstLoad: true,
});

function getCamerasPlaceholder(state, cameras) {
  if (state.get('firstLoad')) {
    let newState = state.set('list', fromJS(cameras.map(serializeCameraPlaceholder)));
    newState = newState.set('firstLoad', false);
    return newState;
  }
  return state;
}

function updateCameraInfo(state, updatedCamera) {
  const cameraList = state.get('list');
  const index = cameraList.findIndex(item => item.get('id') === updatedCamera.id);
  if (index === -1) {
    return state;
  }

  let camera = cameraList.get(index);
  camera = camera.set('label', updatedCamera.info.label);
  return state.update('list', list => list.set(index, camera));
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CAMERAS:
      return getCamerasPlaceholder(state, action.cameras);
    case GET_CAMERAS_SUCCESS:
      return state.set('list', fromJS(action.cameras));
    case DELETE_CAMERA_SUCCESS:
      return state.update('list', list =>
        list.filter(item => item.get('id') !== action.cameraId),
      );
    case UPDATE_CAMERA_SUCCESS:
      return updateCameraInfo(state, action.camera);
    default:
      return state;
  }
}
