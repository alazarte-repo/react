import axios from 'axios';
import { baseUrl, getHeaders } from '../config';


const requestPath = '/reminder_type';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  getTypes: () => axios
    .get(resourceUrl, { headers: getHeaders() })
    .then(response => response.data),

  getHistory: (thingId, parameters) => axios
    .get(`${baseUrl}/things/${thingId}/reminders_logs`, {
      headers: getHeaders(),
      params: parameters,
    }).then(response => response.data),

  updateReminder: (thingId, reminderId, body) => axios
    .patch(`${baseUrl}/things/${thingId}/reminders/${reminderId}`, body, { headers: getHeaders() })
    .then(response => response.data),

  add: (thingId, params) => axios
    .post(`${baseUrl}/things/${thingId}/reminders`, params, { headers: getHeaders() })
    .then(response => response.data),

  register: (thingId, reminderId, body) => axios
    .post(`${baseUrl}/things/${thingId}/reminders/${reminderId}/done`, body, { headers: getHeaders() })
    .then(response => response.data),

  delete: (thingId, reminderId) => axios
    .delete(`${baseUrl}/things/${thingId}/reminders/${reminderId}`, { headers: getHeaders() }),
};
