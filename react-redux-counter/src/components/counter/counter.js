import {depositar, extraer} from '../../store/total/action'
import {connect} from 'react-redux';
import { totalActual } from '../../store/total/reducer';

const mapStateToProps = (state) => {
    return {
        total: totalActual(state),
    };
};

//Todos los componentes de React retornan algo que debe esta en una sola etiqueta
const Counter = ({total, depositar, extraer}) => {
    return(
        <div>
            <h1>{total}</h1>
            {/* A través de la función anonima cuando el usuario le de un click */}
            <button onClick={() => depositar()}>Sumar $10</button>
            <button onClick={() => extraer()}>Restar $10</button>
        </div>
    );
}

//Conexión del componente con el store
//Si quiero enviar algo al Store, lo pongo en el primer parametro
//Si quiero obtener algo del store, debo especificarlo en el segundo parametro entre llaves si es más de uno
export default connect(mapStateToProps, {depositar, extraer})(Counter);