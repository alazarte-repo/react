import axios from 'axios';
import { baseUrl, getHeaders } from '../config';


const requestPath = '/users';
const resourceUrl = `${baseUrl}${requestPath}/me`;

export default {
  get: () => axios
    .get(resourceUrl, { headers: getHeaders() })
    .then(response => response.data),
  changePassword: body => axios
    .post(`${resourceUrl}/password`, body, { headers: getHeaders() })
    .then(response => response.data),
  changePin: body => axios
    .patch(resourceUrl, body, { headers: getHeaders() })
    .then(response => response.data),
  accType: () => axios.get(`${resourceUrl}/groups`, { headers: getHeaders() })
    .then(res => res.data),
};
