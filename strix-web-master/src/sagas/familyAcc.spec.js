/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { familyAcc, accountService } from '../services';
import { getUsers as getUsersSelector } from '../selectors/NavBar.selector';
import localStorageMock from '../../tools/mock-api-tools/localStorage';
import {
  ADD_FAMILY_USER_SUCCESS,
  GET_FAMILY_USERS_SUCCESS,
  DELETE_FAMILY_USER_SUCCESS,
  MODIFY_USER,
  MODIFY_FAMILY_USER_SUCCESS,
  ADD_FAMILY_USER_ERROR,
  ADD_FAMILY_USER,
} from '../constants';
import { TOKEN } from '../constants/localStorageKeys';
import { getUsers, modifyUser, addOrModifyUser, deleteUser, addUser } from './familyAcc';

window.localStorage = localStorageMock;
localStorage.setItem(TOKEN, '4uth3nt1c4t10nt0k3n');
const token = { accessToken: localStorage.getItem(TOKEN) };

describe('family saga tests', () => {
  it('should get family members', () => {
    const usersPayload = [{
      account_id: 'mrn:account:a',
      active: true,
      first_name: 'claudia',
      id: 'mrn:user:23',
      last_name: 'perez',
      username: 'clau@gmail.com',
    },
    {
      account_id: 'mrn:account:b',
      active: true,
      first_name: 'donald',
      id: 'mrn:user:666',
      last_name: 'trump',
      username: 'donald@gmail.com',
    }];
    testSaga(getUsers)
      .next()
      .call(familyAcc.get)
      .next(usersPayload)
      .put({ type: GET_FAMILY_USERS_SUCCESS, users: usersPayload })
      .next()
      .isDone();
  });

  it('should modify user', () => {
    const action = { firstName: 'eva', lastName: 'duarte', id: 'mrn:user:100' };
    const payload = [
      { action: 'update', value: action.firstName, path: '/first_name' },
      { action: 'update', value: action.lastName, path: '/last_name' },
    ];
    const expectedValue = {
      account_id: 'mrn:account:b',
      active: true,
      first_name: 'eva',
      id: 'mrn:user:100',
      last_name: 'duarte',
      username: 'eva@gmail.com',
    };
    testSaga(modifyUser, action)
      .next()
      .call(familyAcc.patch, action.id, payload)
      .next(expectedValue)
      .put({ type: MODIFY_FAMILY_USER_SUCCESS, user: expectedValue })
      .next()
      .isDone();
  });

  it('should add user', () => {
    const action = {
      username: 'rick@gmail.com',
      firstName: 'rick',
      lastName: 'morty',
    };

    testSaga(addOrModifyUser, action)
      .next()
      .call(accountService.checkUsername, action.username, token)
      .next(false)
      .select(getUsersSelector)
      .next([])
      .put({
        type: ADD_FAMILY_USER,
        username: action.username,
        firstName: action.firstName,
        lastName: action.lastName,
      })
      .next()
      .isDone();
  });

  it('should notify user is already registered in another account', () => {
    const action = {
      username: 'rick@gmail.com',
      firstname: 'rick',
      lastname: 'morty',
    };

    testSaga(addOrModifyUser, action)
      .next()
      .call(accountService.checkUsername, action.username, token)
      .next(true)
      .select(getUsersSelector)
      .next([])
      .put({
        type: ADD_FAMILY_USER_ERROR,
        message: `El usuario ${action.username} ya se encuentra registrado en otra cuenta.`,
      })
      .next()
      .isDone();
  });

  it('should modify user if is already added in this account', () => {
    const action = {
      userName: 'rick@gmail.com',
      firstName: 'rick',
      lastname: 'morty',
    };
    const id = 'mrn:user:123';
    testSaga(addOrModifyUser, action)
      .next()
      .call(accountService.checkUsername, action.username, token)
      .next(true)
      .select(getUsersSelector)
      .next(fromJS([{ ...action, id }]))
      .put({
        type: MODIFY_USER,
        firstName: action.firstName,
        lastName: action.lastName,
        id,
      })
      .next()
      .isDone();
  });

  it('should delete family member', () => {
    const action = { id: '222' };

    testSaga(deleteUser, action)
      .next()
      .call(familyAcc.delete, '222')
      .next()
      .put({ type: DELETE_FAMILY_USER_SUCCESS, id: '222' })
      .next()
      .isDone();
  });

  it('should add user', () => {
    const action = {
      userName: 'rick@gmail.com',
      firstName: 'rick',
      lastname: 'morty',
    };

    const expectedValue = {
      account_id: 'mrn:account:r',
      active: true,
      first_name: 'rick',
      id: 'mrn:user:320',
      last_name: 'morty',
      username: 'rick@gmail.com',
    };

    testSaga(addUser, action)
      .next()
      .call(familyAcc.post, {
        username: action.username,
        first_name: action.firstName,
        last_name: action.lastName,
      })
      .next(expectedValue)
      .put({ type: ADD_FAMILY_USER_SUCCESS, newUser: expectedValue })
      .next()
      .isDone();
  });
});
