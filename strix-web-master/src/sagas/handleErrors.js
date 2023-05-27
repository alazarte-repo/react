import { put, select } from 'redux-saga/effects';
import { isAppOffline as isAppOff } from '../selectors/AppState.selector';
import {
  APP_IS_OFFLINE,
  APP_IS_ONLINE,
  REFRESH_TOKEN,
  ERROR,
} from '../constants';

const ERROR_MESSAGE = 'Ha ocurrido un error';

const handleHttpErrors = (saga, errorMessage = ERROR_MESSAGE) => (
  function* _handleHttpError(action) {
    try {
      yield* saga(action);
      const isAppOffline = yield select(isAppOff);
      if (isAppOffline) {
        yield put({ type: APP_IS_ONLINE });
      }
    } catch (error) {
      if (error.request != null) {
        switch (error.request.status) {
          case 401:
            if (action.retryOn401 == null || action.retryOn401) {
              yield put({ type: REFRESH_TOKEN, dispatcher: action });
            }
            break;
          case 0:
            if (error.message === 'Network Error') {
              yield put({ type: APP_IS_OFFLINE });
            }
            break;
          default:
            yield put({ type: ERROR, state: { status: true, message: errorMessage } });
            break;
        }
      } else {
        yield put({ type: ERROR, state: { status: true, message: errorMessage } });
      }
    }
  }
);

export default handleHttpErrors;

export {
  handleHttpErrors,
};
