import { fromJS } from 'immutable';
import { UserInfoByCountry, loadingUserCountryInfo } from '../utils/user';
import {
  GET_USER_DATA_SUCCESSFUL,
  GET_DEVICES_SUCCESS,
  REVOKE_DEVICE_SUCCESS,
  CHANGE_PIN_SUCCESS,
  MODIFY_USER,
  ADD_FAMILY_USER,
  ADD_FAMILY_USER_SUCCESS,
  ADD_FAMILY_USER_ERROR,
  GET_FAMILY_USERS_SUCCESS,
  DELETE_FAMILY_USER_SUCCESS,
  MODIFY_FAMILY_USER_SUCCESS,
  FAMILY_USERS_RESET_ADD_ERROR,
} from '../constants';

const initialState = fromJS({
  user: {},
  devices: [],
  users: [],
  addFamilyUserError: null,
  loadingNewFamilyUser: false,
  countryInfo: loadingUserCountryInfo,
});

function getUserDataSuccessful(state, userData) {
  let newState = state;
  newState = newState.set('user', fromJS(userData));
  newState = newState.set('countryInfo', fromJS(UserInfoByCountry(userData.countryId)));
  return newState;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA_SUCCESSFUL:
      return getUserDataSuccessful(state, action.userData);
    case GET_DEVICES_SUCCESS:
      return state.set('devices', fromJS(action.deviceList));
    case REVOKE_DEVICE_SUCCESS:
      return state.update('devices', v => v.filter(device => device.get('id') !== action.deviceId));
    case GET_FAMILY_USERS_SUCCESS:
      return state.set('users', fromJS(action.users));
    case MODIFY_USER:
      return state.set('loadingNewFamilyUser', false);
    case ADD_FAMILY_USER:
      return state.set('addFamilyUserError', null)
        .set('loadingNewFamilyUser', true);
    case ADD_FAMILY_USER_SUCCESS:
      return state.update('users', list => list.push(fromJS(action.newUser)))
        .set('loadingNewFamilyUser', false);
    case ADD_FAMILY_USER_ERROR:
      return state.set('addFamilyUserError', action.message)
        .set('loadingNewFamilyUser', false);
    case DELETE_FAMILY_USER_SUCCESS:
      return state.update('users', list => list.filter(user => user.get('id') !== action.id));
    case CHANGE_PIN_SUCCESS:
      return state.setIn(['user', 'securityPin'], action.userData.securityPin);
    case FAMILY_USERS_RESET_ADD_ERROR:
      return state.set('addFamilyUserError', null);
    case MODIFY_FAMILY_USER_SUCCESS:
      return state.update('users', (users) => {
        const index = users.findIndex(familyMember => familyMember.get('id') === action.user.id);
        return users.set(index, fromJS(action.user));
      });
    default:
      return state;
  }
}
