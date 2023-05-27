/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { requestResetPassword, resetPassword } from './forgotPassword';
import { forgotPassword } from '../services';

import {
  FORGOT_PASSWORD_REQUEST_CODE,
  FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL,
  FORGOT_PASSWORD_REQUEST_CODE_ERROR,
  FORGOT_PASSWORD_RESET_PASSWORD,
  FORGOT_PASSWORD_RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL,
} from '../constants';

const USERNAME = 'test_username';
const CODE = '4br42bno5jg8j23mg3jk';
const NEW_PASSWORD = 'new_password';

describe('forgotPassword saga test', () => {
  it('should request reset password', () => {
    const action = {
      type: FORGOT_PASSWORD_REQUEST_CODE,
      username: USERNAME,
    };
    testSaga(requestResetPassword, action)
      .next()
      .call(forgotPassword.requestChangePasswordCode, { username: USERNAME })
      .next()
      .put({ type: FORGOT_PASSWORD_REQUEST_CODE_SUCCESSFUL })
      .next()
      .isDone();
  });

  it('should notify request code error when it fails', () => {
    const action = {
      type: FORGOT_PASSWORD_REQUEST_CODE,
      username: USERNAME,
    };
    testSaga(requestResetPassword, action)
      .next()
      .call(forgotPassword.requestChangePasswordCode, { username: action.username })
      .throw(new Error('error'))
      .put({ type: FORGOT_PASSWORD_REQUEST_CODE_ERROR, error: 'User not found' })
      .next()
      .isDone();
  });

  it('should change password', () => {
    const action = {
      type: FORGOT_PASSWORD_RESET_PASSWORD,
      username: USERNAME,
      code: CODE,
      password: NEW_PASSWORD,
    };
    const requestBody = {
      username: action.username,
      code: action.code,
      password: action.password,
    };
    testSaga(resetPassword, action)
      .next()
      .call(forgotPassword.resetPassword, requestBody)
      .next()
      .put({ type: FORGOT_PASSWORD_RESET_PASSWORD_SUCCESSFUL })
      .next()
      .isDone();
  });

  it('should notify error when change passsword fails', () => {
    const action = {
      type: FORGOT_PASSWORD_RESET_PASSWORD,
      username: USERNAME,
      code: CODE,
      password: NEW_PASSWORD,
    };
    const requestBody = {
      username: action.username,
      code: action.code,
      password: action.password,
    };
    const error = new Error('error');
    testSaga(resetPassword, action)
      .next()
      .call(forgotPassword.resetPassword, requestBody)
      .throw(error)
      .put({ type: FORGOT_PASSWORD_RESET_PASSWORD_ERROR, err: error })
      .next()
      .isDone();
  });
});
