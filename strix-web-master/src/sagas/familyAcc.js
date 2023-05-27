import { call, all, takeLatest, put, takeEvery, select } from 'redux-saga/effects';
import { familyAcc, accountService } from '../services';
import { handleHttpErrors } from './handleErrors';
import { getUsers as getUsersSelector } from '../selectors/NavBar.selector';
import { TOKEN } from '../constants/localStorageKeys';
import {
  ADD_FAMILY_USER,
  ADD_FAMILY_USER_SUCCESS,
  ADD_FAMILY_USER_ERROR,
  GET_FAMILY_USERS_SUCCESS,
  GET_FAMILY_USERS,
  DELETE_FAMILY_USER,
  DELETE_FAMILY_USER_SUCCESS,
  MODIFY_USER,
  MODIFY_FAMILY_USER_SUCCESS,
  ADD_OR_MODIFY_FAMILY_USER,
} from '../constants';

export function* getUsers() {
  const usersPayload = yield call(familyAcc.get);
  yield put({ type: GET_FAMILY_USERS_SUCCESS, users: usersPayload });
}

export function* modifyUser({ firstName, lastName, id }) {
  const payload = [
    {
      action: 'update',
      value: firstName,
      path: '/first_name',
    },
    {
      action: 'update',
      value: lastName,
      path: '/last_name',
    },
  ];
  const modifyUserPayload = yield call(familyAcc.patch, id, payload);
  yield put({ type: MODIFY_FAMILY_USER_SUCCESS, user: modifyUserPayload });
}

export function* addUser({ username, firstName, lastName }) {
  const addUserPayload = yield call(familyAcc.post, {
    username,
    first_name: firstName,
    last_name: lastName,
  });
  yield put({ type: ADD_FAMILY_USER_SUCCESS, newUser: addUserPayload });
}

export function* addOrModifyUser({ username, firstName, lastName }) {
  // First we check that the username is not created in another account
  const token = { accessToken: localStorage.getItem(TOKEN) };
  const usernameExists = yield call(accountService.checkUsername, username, token);
  const currentUsers = yield select(getUsersSelector);
  if (usernameExists) {
    const alreadyAddedUser = currentUsers.find(x => x.get('username') === username);
    if (alreadyAddedUser == null) {
      yield put({
        type: ADD_FAMILY_USER_ERROR,
        message: `El usuario ${username} ya se encuentra registrado en otra cuenta.`,
      });
    } else {
      yield put({ type: MODIFY_USER, firstName, lastName, id: alreadyAddedUser.get('id') });
    }
  } else {
    // If it does not exists we add it to the account
    yield put({ type: ADD_FAMILY_USER, username, firstName, lastName });
  }
}

export function* deleteUser({ id }) {
  yield call(familyAcc.delete, id);
  yield put({ type: DELETE_FAMILY_USER_SUCCESS, id });
}

export default function* fammilyAccRootSaga() {
  yield all([
    takeLatest(GET_FAMILY_USERS, handleHttpErrors(getUsers)),
    takeLatest(ADD_FAMILY_USER, handleHttpErrors(addUser)),
    takeLatest(ADD_OR_MODIFY_FAMILY_USER, handleHttpErrors(addOrModifyUser)),
    takeEvery(DELETE_FAMILY_USER, handleHttpErrors(deleteUser)),
    takeEvery(MODIFY_USER, handleHttpErrors(modifyUser)),
  ]);
}
