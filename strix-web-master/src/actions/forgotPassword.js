import {
  FORGOT_PASSWORD_REQUEST_CODE,
  FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL,
  FORGOT_PASSWORD_REQUEST_CODE_ERROR,
  FORGOT_PASSWORD_RESET_PASSWORD,
  FORGOT_PASSWORD_RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL,
} from '../constants';

export const forgotPasswordRequestCode = username => ({
  type: FORGOT_PASSWORD_REQUEST_CODE,
  username,
});

export const forgotPasswordRequestCodeSuccessful = () => ({
  type: FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL,
});

export const forgotPasswordRequestCodeError = () => ({
  type: FORGOT_PASSWORD_REQUEST_CODE_ERROR,
});

export const resetPassword = (username, code, password) => ({
  type: FORGOT_PASSWORD_RESET_PASSWORD,
  username,
  code,
  password,
});

export const forgotPasswordResetPasswordSuccessful = () => ({
  type: FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL,
});

export const forgotPasswordResetPasswordError = () => ({
  type: FORGOT_PASSWORD_RESET_PASSWORD_ERROR,
});
