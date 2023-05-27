import axios from 'axios';
import { baseUrl, getHeaders } from '../config';


const requestPath = '/devices';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: (parameters = {}) => axios
    .get(resourceUrl, {
      headers: getHeaders(),
      params: parameters,
    })
    .then(response => response.data),
  post: body => axios
    .post(resourceUrl, body, { headers: getHeaders() })
    .then(response => response.data),
  updateToken: (deviceId, token) => {
    const body = [{
      action: 'update',
      value: token,
      path: '/token',
    }];
    return axios.patch(`${resourceUrl}/${deviceId}`, body, { headers: getHeaders() })
      .then(response => response.data);
  },
  deleteDevice: deviceId => axios
    .delete(`${resourceUrl}/${deviceId}`, { headers: getHeaders() })
    .then(response => response.data),
};
