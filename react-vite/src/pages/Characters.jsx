import {useEffect, useState} from 'react';
import { fetchCharacters } from '../api/fetchCharacters';

const Characters = () => {
const [characters, setCharacters] = useState([]);

    useEffect(() => {
        console.log("Estamos haciendo una petición a una API (fetch)")
        //Declaración de una función--
        const getCharacters = async () => { 
            const data = await fetchCharacters();
            setCharacters(data);
            console.log("Resultado: " + data);
        };
        //Declaración de una función--
        getCharacters(); //Invocación de la función creada.
    },[]);

    return (<div>
        {Characters ? (
            <ul>
            {characters.map((character) => (
                <li key={character.id}>
                    <img src={character.image} alt="" height="200px" width="200px"></img>
                    <div>{character.firstName}</div>
                </li>
            ))}
            </ul>
        ) : (
            <p>Loading characters...</p>
        )}
        </div>
    );
};

export default Characters;