import {put, call, takeLatest } from 'redux-saga/effects';
// Put: Dispara las acciones para que los reducers hagan los suyo
// Call: Para realizar la llamada a una API
// TakeLatest: Colocar una función generadora y que este escuchando las actions
import { START_GET_POKEMONS, SUCCESS_GET_POKEMONS } from '../actions/pokemons';
import apiCall from '../api';

// Se debe crear una función generadora (Ver video)
function* getPokemons({ payload }) {
    try {
        const results = yield call(apiCall, 'get', 'https://pokeapi.co/api/v2/pokemon')
        console.log(results);
        // Put es lo mismo que hacer dispatch
        yield put({ 
            type: SUCCESS_GET_POKEMONS, 
            results 
        });
    } catch (err) {
        console.log(err);
    }
}

// Watchers: Es una función que exportara todas las funciones de este archivo (Es una función generadora).
// Revisa cuando las acciones son disparadas.
export default function* pokemons() {
    // Yield: Palabra reservada de los generadores para pedir una espera.
    yield takeLatest(START_GET_POKEMONS, getPokemons); // Esta línea indica: Cuando recibes un START_GET_POKEMON, llamas a la función getPokemons.
}