import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import rootSaga from './sagas';
import reducers from './reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ router: connectRouter(history), ...reducers }),
  composeEnhancer(
    applyMiddleware(
      sagaMiddleware,
      router,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
export { history };
