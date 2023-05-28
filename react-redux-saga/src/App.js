import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { startGetPokemons } from './redux/actions/pokemons';

function App() {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if(pokemons.length === 0) {
      dispatch(startGetPokemons());
      setPokemons([{},{}]);
    }
  });

  return (
    <div className="App">
      Aprendiendo Redux Saga
    </div>
  );
}

export default App;