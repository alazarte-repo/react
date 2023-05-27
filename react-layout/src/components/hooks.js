//Aparecen desde la versión 16.8. 
//https://es.react.dev/reference/react#state-hooks
//Los hooks nos permiten “enganchar” el estado de React y el ciclo de vida desde componentes de función. 
//Los hooks no funcionan dentro de las clases — te permiten usar React sin clases. 
//Existen varios y podemos crear los propios.

//useState: Es una función en la que podemos guardar los estados de nuestros componentes.
import {useState} from 'react';
//useEffect: Permite hacer efectos secundarios en componentes funcionales.
import {useEffect} from 'react';

export default function Hooks() {
    const [counter, setCounter] = useState(0);
    const [semaforo, setSemaforo] = useState(false);

    useEffect(() => {
        console.log("Valor del semaforo: " + semaforo);
    }, [semaforo]);

    const contar = () =>
    {
        setCounter(counter + 1);
        setSemaforo(!semaforo);
    };

    return (
        <div>
            <h2>Contador de React con Hooks</h2>
            <h4>El valor del contador es {counter}</h4>
            <p>El semaforo esta en color {semaforo ? 'red' : 'green'}</p>
            <button type="submit" onClick={contar}>
                Sumar contador
            </button>
        </div>
    );
}