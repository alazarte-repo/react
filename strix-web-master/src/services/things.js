import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestPath = '/things';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  get: (thingId, parameters = {}) =>
    axios
      .get(`${resourceUrl}/${thingId}`, {
        headers: getHeaders(),
        params: parameters,
      })
      .then(response => response.data),
  getThings: () =>
    axios.get(resourceUrl, { headers: getHeaders() }).then(response => response.data),
  getTrips: (thingId, page) =>
    axios
      .get(
        `${resourceUrl}/${thingId}/trips?_sort=created_timestamp%2Bdesc&_limit=5&_page=${page || 1}`,
        {
          headers: getHeaders(),
        },
      )
      .then(response => response.data),
  getThingTrips: (data) => {
    const start = new Date(data.start).getTime() / 1000;
    const end = new Date(data.end).getTime() / 1000;
    const params = {
      _q: `start.timestamp:[${start} TO ${end}]`,
    };
    return axios
      .get(`${resourceUrl}/${data.id}/trips?_sort=created_timestamp%2Bdesc&_limit=5`, {
        headers: getHeaders(),
        params,
      })
      .then(response => response.data);
  },
  getTripDetails: (thingId, tripId) =>
    axios
      .get(`${resourceUrl}/${thingId}/trips/${tripId}`, { headers: getHeaders() })
      .then(response => response.data),
  executeAction: (thingId, actionType, body) =>
    axios
      .post(`${resourceUrl}/${thingId}/actions/${actionType}`, body, { headers: getHeaders() })
      .then(response => response.data),
  pollAction: (thingId, executionId) =>
    axios
      .get(`${resourceUrl}/${thingId}/actions/${executionId}`, {
        headers: getHeaders(),
      })
      .then(response => response.data),
  getActions: (thingId, query) =>
    axios
      .get(`${resourceUrl}/${thingId}/actions/?_q=${query}`, {
        headers: getHeaders(),
      })
      .then(response => response.data),
  getReminders: thingId =>
    axios
      .get(
        `${baseUrl}/things/${thingId}/reminders?_sort=created_timestamp%2Bdesc`, // TODO AGREGAR EL DESC
        { headers: getHeaders() },
      )
      .then(response => response.data),
  thingConfig: (thingId, body) =>
    axios
      .patch(`${baseUrl}/things/${thingId}/info`, body, { headers: getHeaders() })
      .then(response => response.data),
  getFlexs: (flexId, page) =>
    axios
      .get(
        `${resourceUrl}/${flexId}/locations?_sort=created_timestamp%2Bdesc&_limit=15&_page=${page}`,
        { headers: getHeaders() },
      )
      .then(response => response.data),
  getThingsFromIds: (thingIds, parameters = {}) => {
    const thingsRequests = thingIds.map(thingId =>
      axios.get(`${resourceUrl}/${thingId}`, {
        headers: getHeaders(),
        params: parameters,
      }),
    );
    return axios.all(thingsRequests).then(response => response.map(r => r.data));
  },
};
