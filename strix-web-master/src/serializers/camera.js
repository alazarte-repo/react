import axios from 'axios';
import CameraStatus from '../constants/cameraStatus';

const LOADING_MESSAGE = 'Cargando...';

async function serializeCamera(camera, noPreview = false) {
  const result = {
    id: camera.id,
    label: camera.info.label,
    urls: {
      live_preview_url: camera.includes.live_preview_url,
      live_stream_hls_url: camera.includes.live_stream_hls_url,
    },
  };

  if (noPreview) {
    result.preview = null;
    result.status = CameraStatus.Loading;
    return result;
  }

  try {
    const preview = await axios.get(camera.includes.live_preview_url);
    result.preview = preview;
    result.status = CameraStatus.Online;
  } catch (error) {
    result.preview = null;
    result.status = CameraStatus.Offline;
  }

  return result;
}

function serializeCameraPlaceholder(cameraId) {
  return {
    id: cameraId,
    label: LOADING_MESSAGE,
    preview: null,
    status: CameraStatus.Loading,
    urls: {
      live_preview_url: null,
      live_stream_hls_url: null,
    },
  };
}

export default serializeCamera;
export { serializeCameraPlaceholder };
