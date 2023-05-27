import axios from 'axios';
import { baseUrl, apiCredentials } from '../config';

const tokenPath = '/oauth/token';
const resourceUrl = `${baseUrl}${tokenPath}`;
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  Authorization: `Basic ${apiCredentials}`,
};

export default {
  login: body => axios.post(resourceUrl, body, { headers }).then(response => response.data),
};
