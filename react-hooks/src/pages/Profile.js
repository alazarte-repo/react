import { useParams } from "react-router-dom"

export default function Profile() {
    const {name} = useParams();
    console.log("Nombre: " + name);
    return (
        <div>
            <h4>Desde Perfil, con el nombre de {name}</h4>
        </div>
    )
};