import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestpath = '/shared_locations';
const resourceUrl = `${baseUrl}${requestpath}`;

export default {
  getSharedLocations: () =>
    axios
      .get(resourceUrl, { headers: getHeaders() })
      .then(response => response.data),
};
