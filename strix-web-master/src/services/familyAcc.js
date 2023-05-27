import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestPath = '/users';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: () =>
    axios
      .get(`${resourceUrl}/?active=true`, { headers: getHeaders() })
      .then(response => response.data),
  post: body =>
    axios.post(resourceUrl, body, { headers: getHeaders() }).then(response => response.data),
  delete: userId =>
    axios
      .delete(`${resourceUrl}/${userId}`, { headers: getHeaders() })
      .then(response => response.data),
  getUniqueUser: username =>
    axios
      .get(`${resourceUrl}/?username=${username}`, { headers: getHeaders() })
      .then(response => response.data),
  patch: (userId, body) =>
    axios
      .patch(`${resourceUrl}/${userId}`, body, { headers: getHeaders() })
      .then(response => response.data),
};
