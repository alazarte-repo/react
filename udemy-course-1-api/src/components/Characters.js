export default function Characters(props) {
    // console.log(props);
    const { characters, setCharacters } = props;
    const resetCharacters = () => {
        // console.log("Reseteando");
        setCharacters(null);
    }

    return(
        <div className="characters">
            <h1>Personajes</h1>
            <span className="back-home" onClick={resetCharacters}>Volver a la home</span>
            <div className="container-characters">
                {characters.map((character, index) => (
                    <div className="character-container" key={index}>
                        <div>
                            <img src={character.image} alt={character.name}></img>
                        </div>
                        <div>
                            <h3>{character.name}</h3>
                            <h6>
                                {character.status === "Alive" ? 
                                (<span className="alive">Alive</span>)
                                :
                                (<span className="dead">Dead</span>)
                                }
                            </h6>
                            <p>
                                <span className="text-grey">Especie: </span>
                                <span className="text-grey">{character.species}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};