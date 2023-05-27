import axios from 'axios';

import { baseUrl, apiCredentials } from '../config';

const path = '/services/users/request_change_password_code';
const resetPasswordPath = '/services/users/change_password';

const resourceUrl = `${baseUrl}${path}`;
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Basic ${apiCredentials}`,
};

export default {
  requestChangePasswordCode: body =>
    axios.post(resourceUrl, body, { headers }).then(response => response.data),
  resetPassword: body =>
    axios.post(`${baseUrl}${resetPasswordPath}`, body, { headers }).then(response => response.data),
};
