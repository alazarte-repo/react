import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestPath = '/things';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: thingId =>
    axios.get(`${resourceUrl}/${thingId}/preferences`, { headers: getHeaders() })
      .then(response => response.data),
  patch: (thingId, body) =>
    axios.patch(`${resourceUrl}/${thingId}`, body, { headers: getHeaders() })
      .then(response => response.data),
  put: (thingId, body) =>
    axios.put(`${resourceUrl}/${thingId}/preferences`, body, { headers: getHeaders() })
      .then(response => response.data),
};
