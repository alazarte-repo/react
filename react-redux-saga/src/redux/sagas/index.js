// La finalidad de este archivo es tener un 'main' de Sagas desde donde voy a ejecutarlos por más que tenga muchas sagas, 
// es una buena practica incorporarlo para mayor legibilidad de código

// Esta función de Redux Saga me permite ejecutar todos los watchers de mi projecto
import { all } from 'redux-saga/effects';
// Importo todas las sagas creadas
import pokemons from './pokemons';

export default function* rootSaga() {
    // Recibe como parametro un arreglo de funciones/watchers
    // De esta manera puedo poner a ejecutar todas las sagas para que esten al pendientes de las acciones disparadas
    yield all([
        pokemons()
    ]);
}