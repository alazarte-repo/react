import axios from 'axios';
import { baseUrl, getHeaders } from '../config';


const requestPath = '/geofences';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  getGeofences: () => axios
    .get(resourceUrl, { headers: getHeaders() })
    .then(response => response.data),
  create: geofenceData => axios
    .post(resourceUrl, geofenceData, { headers: getHeaders() })
    .then(response => response.data),
  delete: id => axios
    .delete(`${resourceUrl}/${id}`, { headers: getHeaders() })
    .then(response => response.data),
};

