/* eslint-disable no-confusing-arrow */
import axios from 'axios';
import { baseUrl, getHeaders, apiCredentials } from '../config';

const resourceUrl = `${baseUrl}/accounts`;

export default {
  get: (accountId, parameters = {}) => axios
    .get(`${resourceUrl}/${accountId}`, {
      headers: getHeaders(),
      params: parameters,
    })
    .then(response => response.data),

  create: (accountInformation, token) => axios
    .post(
      `${baseUrl}/services/accounts/signup`,
      accountInformation,
      {
        headers: {
          'Accept-Language': 'es-AR',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token.accessToken}`,
        },
      },
    ).then(response => response.data),

  getRegisterToken: () => axios
    .post(
      `${baseUrl}/oauth/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Accept-Language': 'es-AR',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: `Basic ${apiCredentials}`,
        },
      },
    ).then(response => response.data),

  checkUsername: (username, token) => axios
    .get(
      `${baseUrl}/services/users/check_username?username=${username}`,
      {
        headers: {
          'Accept-Language': 'es-AR',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
    .then(response => response.status != null && response.status === 200 ? true : null)
    .catch(error => error.response.status != null && error.response.status === 404 ? false : null),

  verifyAccount: (username, code, token) => axios
    .post(
      `${baseUrl}/services/users/verify_email`,
      { username, code },
      {
        headers: {
          'Accept-Language': 'es-AR',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token.accessToken}`,
        },
      },
    ).then(response => response.data),

};
