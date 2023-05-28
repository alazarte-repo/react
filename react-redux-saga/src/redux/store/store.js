import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reduxSaga from 'redux-saga';
import rootSaga from '../sagas';

function reducers() {
    return {
        testing: ''
    };
}

const sagaMidlerware = reduxSaga();

const executeSagas = () => {
    return {
        ...createStore(reducers, applyMiddleware(sagaMidlerware)),
        // Seteo el listado de sagas para que esten escuchando siempre
        runSaga: sagaMidlerware.run(rootSaga)
    };
};

export default executeSagas;