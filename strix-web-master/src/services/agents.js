import axios from 'axios';
import { baseUrl, getHeaders } from '../config';


const requestPath = '/agents';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: thingId => axios
    .get(resourceUrl, { headers: getHeaders(), params: { thing_id: thingId } })
    .then(response => response.data),
  create: (type, thingId) => axios
    .post(
      resourceUrl,
      { type: `${type}`, thing_id: thingId }, { headers: getHeaders() },
    )
    .then(response => response.data),
  remove: agentId => axios
    .delete(`${resourceUrl}/${agentId}`, { headers: getHeaders() })
    .then(response => response.data),
  assignGeofence: body => axios
    .post(`${resourceUrl}`, body, { headers: getHeaders() })
    .then(response => response.data),
  updateGeofence: (agentId, body) => axios
    .patch(`${resourceUrl}/${agentId}`, body, { headers: getHeaders() })
    .then(response => response.data),
  createAgentSpeedLimit: body => axios
    .post(`${resourceUrl}`, body, { headers: getHeaders() })
    .then(response => response.data),
  updateAgentSpeedLimit: (agentId, body) => axios
    .patch(`${resourceUrl}/${agentId}`, body, { headers: getHeaders() })
    .then(response => response.data),
};
