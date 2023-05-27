//Store: Es un objeto que reune las actions y los reducers.
//Tiene como responsabilidades: almacenar, leer y actualizar el estado de la aplicación
//También se encarga de llamar al reducer

import { legacy_createStore as createStore, combineReducers } from 'redux';
import totalReducer from './total/reducer';

const reducers = combineReducers({
    totalReducer,
});

//Link de la documentación de Redux DevTool: https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
const store = createStore(
    reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;