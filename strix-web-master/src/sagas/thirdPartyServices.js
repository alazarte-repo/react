import { put, all, call, takeEvery, select, take, delay } from 'redux-saga/effects';
import thirdPartyServices from '../services/thirdPartyServices';
import { processSolidmationHomes } from '../utils/thirdPartyServices';
import { handleHttpErrors } from './handleErrors';
import {
  SOLIDMATION_LOGIN,
  SOLIDMATION_LOGIN_SUCCESS,
  SOLIDMATION_LOGIN_FAILED,
  SOLIDMATION_GET_STATUS,
  SOLIDMATION_GET_STATUS_LOGGED,
  SOLIDMATION_GET_STATUS_NOTLOGGED,
  SOLIDMATION_UNLINK_ACCOUNT,
  SOLIDMATION_UNLINK_ACCOUNT_SUCCESS,
  SOLIDMATION_SYNC_HOMES,
  SOLIDMATION_SYNC_HOMES_SUCCESS,
  SOLIDMATION_PAIR_HOMES,
  SOLIDMATION_PAIR_HOMES_SUCCESS,
  SOLIDMATION_LIST_HOMES,
  SOLIDMATION_LIST_HOMES_SUCCESS,
  UPDATE_THINGS,
  UPDATE_HOME_CONTROL_THINGS_SUCCESS,
  HOME_CONTROL_SET_FIRSTLOAD,
} from '../constants';

export function* solidmationListHomes() {
  const homeList = yield call(thirdPartyServices.getSolidmationListHome);
  yield put({
    type: SOLIDMATION_LIST_HOMES_SUCCESS,
    homeList: processSolidmationHomes(homeList),
  });
}

export function* solidmationLogin({ email, password }) {
  try {
    yield call(thirdPartyServices.solidmationLogin, email, password);
    yield delay(1000);
    yield put({ type: SOLIDMATION_LIST_HOMES });
    yield take(SOLIDMATION_LIST_HOMES_SUCCESS);
    yield put({ type: SOLIDMATION_LOGIN_SUCCESS });
  } catch (error) {
    if (error.request && error.request.status === 400) {
      yield put({
        type: SOLIDMATION_LOGIN_FAILED,
        message: 'Email o contraseña inválidos',
      });
    } else {
      throw (error);
    }
  }
}

export function* solidmationGetStatus() {
  try {
    const username = yield call(thirdPartyServices.solidmationGetStatus);
    const homeList = yield call(thirdPartyServices.getSolidmationListHome);
    yield put({
      type: SOLIDMATION_GET_STATUS_LOGGED,
      homeList: processSolidmationHomes(homeList),
      username: username.username,
    });
  } catch (error) {
    if (error.request && error.request.status === 404) {
      yield put({ type: SOLIDMATION_GET_STATUS_NOTLOGGED });
    } else {
      throw (error);
    }
  }
}

export function* solidmationUnlinkAccount() {
  yield call(thirdPartyServices.solidmationUnlinkAccount);
  yield put({ type: SOLIDMATION_UNLINK_ACCOUNT_SUCCESS });
}

export function* solidmationSyncHomes() {
  yield call(thirdPartyServices.solidmationSyncHomes);
  yield put({ type: HOME_CONTROL_SET_FIRSTLOAD });
  yield put({ type: SOLIDMATION_SYNC_HOMES_SUCCESS });
}

export function* solidmationPairHomes({ magentaHome, solidmationHome }) {
  yield call(thirdPartyServices.solidmationPairHomes, magentaHome.id, solidmationHome.id);
  // We wait because the server takes a little to attach the new things to the home
  yield delay(1000);

  yield put({ type: UPDATE_THINGS });
  yield take(UPDATE_HOME_CONTROL_THINGS_SUCCESS);

  const homeList = yield call(thirdPartyServices.getSolidmationListHome);
  const pairedHomeInfoChildren = yield select(state => state.getIn(['homeControl', 'things', magentaHome.id]));
  const pairedHomeInfo = {
    id: magentaHome.id,
    label: magentaHome.label,
    children: pairedHomeInfoChildren,
  };
  yield put({
    type: SOLIDMATION_PAIR_HOMES_SUCCESS,
    homeList: processSolidmationHomes(homeList),
    pairedHomeInfo,
  });
}

export default function* rootThirdPartyServicesSaga() {
  yield all([
    takeEvery(SOLIDMATION_LOGIN, handleHttpErrors(solidmationLogin, 'Ha ocurrido un error al querer autenticarse. Intente nuevamente.')),
    takeEvery(SOLIDMATION_GET_STATUS, handleHttpErrors(solidmationGetStatus, 'Ha ocurrido un error al obtener el estado de la cuenta.')),
    takeEvery(SOLIDMATION_UNLINK_ACCOUNT, handleHttpErrors(solidmationUnlinkAccount, 'Ha ocurrido un error al desvincular su cuenta.')),
    takeEvery(SOLIDMATION_SYNC_HOMES, handleHttpErrors(solidmationSyncHomes, 'Ha ocurrido un error al sincronizar sus casas.')),
    takeEvery(SOLIDMATION_PAIR_HOMES, handleHttpErrors(solidmationPairHomes, 'Ha ocurrido un error al vincular sus casas.')),
    takeEvery(SOLIDMATION_LIST_HOMES, handleHttpErrors(solidmationListHomes, 'Ha ocurrido un error al actualizar sus casas.')),
  ]);
}
