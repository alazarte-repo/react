import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestPath = '/things';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: thingId =>
    axios
      .get(`${resourceUrl}/${thingId}/signals`, { headers: getHeaders() })
      .then(response => response.data),
  getCameras: cameraId =>
    axios
      .get(`${resourceUrl}/${cameraId}/?_include=live_preview_url,live_stream_hls_url`, { headers: getHeaders() })
      .then(response => response.data),
  remove: cameraId => axios
    .delete(`${resourceUrl}/${cameraId}`, { headers: getHeaders() })
    .then(response => response.data),
  patch: (cameraId, body) =>
    axios
      .patch(`${resourceUrl}/${cameraId}/info`, body, { headers: getHeaders() })
      .then(response => response.data),
};

