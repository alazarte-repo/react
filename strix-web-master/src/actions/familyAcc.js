import {
  DELETE_FAMILY_USER,
  GET_FAMILY_USERS,
  MODIFY_USER,
  FAMILY_USERS_RESET_ADD_ERROR,
  ADD_OR_MODIFY_FAMILY_USER,
} from '../constants';

export const getFamilyUsers = () => ({
  type: GET_FAMILY_USERS,
});

export const addOrModifyFamilyUser = (username, firstName, lastName) => ({
  type: ADD_OR_MODIFY_FAMILY_USER,
  username,
  firstName,
  lastName,
});

export const deleteFamilyUser = id => ({
  type: DELETE_FAMILY_USER,
  id,
});

export const modifyFamilyUser = (firstName, lastName, id) => ({
  type: MODIFY_USER,
  firstName,
  lastName,
  id,
});

export const resetAddUserError = () => ({
  type: FAMILY_USERS_RESET_ADD_ERROR,
});
