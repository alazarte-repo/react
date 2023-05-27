import {
  ACCOUNT_CREATE,
  ACCOUNT_CHECK_USERNAME,
  ACCOUNT_PREVIOUS_STEP,
  ACCOUNT_VERIFY_USERNAME,
} from '../constants';

export const createAccount = accountInformation => ({
  type: ACCOUNT_CREATE,
  accountInformation,
});

export const checkUsername = username => ({
  type: ACCOUNT_CHECK_USERNAME,
  username,
});

export const previousStep = () => ({
  type: ACCOUNT_PREVIOUS_STEP,
});

export const verifyUsername = (username, code) => ({
  type: ACCOUNT_VERIFY_USERNAME,
  username,
  code,
});

export default {
  createAccount,
  verifyUsername,
  checkUsername,
  previousStep,
};
