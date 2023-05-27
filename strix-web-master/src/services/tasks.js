import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestPath = '/things';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: thingId =>
    axios
      .get(`${resourceUrl}/${thingId}/tasks`, {
        headers: getHeaders(),
      })
      .then(response => response.data),
  edit: (body, thingId, alarmId) =>
    axios
      .patch(`${resourceUrl}/${thingId}/tasks/${alarmId}`, body, {
        headers: getHeaders(),
      })
      .then(response => response.data),
  create: (body, thingId) =>
    axios
      .post(`${resourceUrl}/${thingId}/tasks`, body, { headers: getHeaders() })
      .then(response => response.data),
  delete: (thingId, alarmId) =>
    axios
      .delete(`${resourceUrl}/${thingId}/tasks/${alarmId}`, {
        headers: getHeaders(),
      })
      .then(response => response.data),
};
