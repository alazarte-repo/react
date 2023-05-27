import {
  CREATE_PASSWORD,
  CREATE_PIN,
} from '../constants';

export const createPassword = (password, code, username) => ({
  type: CREATE_PASSWORD,
  password,
  code,
  username,
});

export const createPin = (pin, id) => ({
  type: CREATE_PIN,
  pin,
  id,
});

