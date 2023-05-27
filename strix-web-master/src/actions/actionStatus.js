

import {
  SUCCESS,
  ERROR,
} from '../constants';

export const notifySuccess = message => ({
  type: SUCCESS,
  state: {
    status: true,
    message,
  },
});

export const notifyError = message => ({
  type: ERROR,
  state: {
    status: true,
    message,
  },
});

export default {
  notifySuccess,
  notifyError,
};
