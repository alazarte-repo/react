import { fromJS } from 'immutable';
import ServiceStatus from '../constants/thirdPartyServiceStatus';
import {
  SOLIDMATION_LOGIN,
  SOLIDMATION_LOGIN_FAILED,
  SOLIDMATION_LOGIN_SUCCESS,
  SOLIDMATION_GET_STATUS,
  SOLIDMATION_GET_STATUS_LOGGED,
  SOLIDMATION_GET_STATUS_NOTLOGGED,
  SOLIDMATION_UNLINK_ACCOUNT,
  SOLIDMATION_UNLINK_ACCOUNT_SUCCESS,
  SOLIDMATION_SYNC_HOMES,
  SOLIDMATION_SYNC_HOMES_SUCCESS,
  SOLIDMATION_PAIR_HOMES,
  SOLIDMATION_PAIR_HOMES_SUCCESS,
  SOLIDMATION_LIST_HOMES_SUCCESS,
} from '../constants';

const initialState = fromJS({
  solidmation: {
    status: ServiceStatus.Unknown,
    username: null,
    errorMessage: null,
    list: {},
    homeDetail: null,
  },
});

function processLogged(state, homes, username) {
  let newState = state.setIn(['solidmation', 'status'], ServiceStatus.Logged);
  newState = newState.setIn(['solidmation', 'list'], fromJS(homes));
  newState = newState.setIn(['solidmation', 'username'], username);
  return newState;
}

function processFailedLogin(state, message) {
  let newState = state.setIn(['solidmation', 'status'], ServiceStatus.NotLogged);
  newState = newState.setIn(['solidmation', 'errorMessage'], message);
  return newState;
}

function processLogin(state) {
  let newState = state.setIn(['solidmation', 'status'], ServiceStatus.LoggingIn);
  newState = newState.setIn(['solidmation', 'errorMessage'], null);
  return newState;
}

function processPairedHomes(state, homes, pairedHomeInfo) {
  let newState = state.setIn(['solidmation', 'status'], ServiceStatus.Logged);
  newState = newState.setIn(['solidmation', 'list'], fromJS(homes));
  newState = newState.setIn(['solidmation', 'homeDetail'], fromJS(pairedHomeInfo));
  return newState;
}


export default function (state = initialState, action) {
  switch (action.type) {
    case SOLIDMATION_LOGIN:
      return processLogin(state);

    case SOLIDMATION_LOGIN_FAILED:
      return processFailedLogin(state, action.message);

    case SOLIDMATION_LOGIN_SUCCESS:
      return state.setIn(['solidmation', 'status'], ServiceStatus.RecentLogin);

    case SOLIDMATION_GET_STATUS_LOGGED:
      return processLogged(state, action.homeList, action.username);

    case SOLIDMATION_GET_STATUS_NOTLOGGED:
    case SOLIDMATION_UNLINK_ACCOUNT_SUCCESS:
      return state.setIn(['solidmation', 'status'], ServiceStatus.NotLogged);

    case SOLIDMATION_PAIR_HOMES_SUCCESS:
      return processPairedHomes(state, action.homeList, action.pairedHomeInfo);

    case SOLIDMATION_SYNC_HOMES_SUCCESS:
      return state.setIn(['solidmation', 'status'], ServiceStatus.Logged);

    case SOLIDMATION_UNLINK_ACCOUNT:
    case SOLIDMATION_SYNC_HOMES:
    case SOLIDMATION_PAIR_HOMES:
    case SOLIDMATION_GET_STATUS:
      return state.setIn(['solidmation', 'status'], ServiceStatus.Working);

    case SOLIDMATION_LIST_HOMES_SUCCESS:
      return state.setIn(['solidmation', 'list'], fromJS(action.homeList));

    default:
      return state;
  }
}
