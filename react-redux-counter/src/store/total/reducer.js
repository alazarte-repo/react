const estadoInicial = { 
    total: 0,
  };

//No cambio el estado, devuelvo uno nuevo.
//En los reducers es buena práctica utilizar un switch
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = estadoInicial, action) => { 
    switch(action.type)  {

      case 'PUT_MONEY':
        return {
           ...state, //Retorno el estado anterior
           total: state.total + action.total
        };

      case 'GET_MONEY':
        return {
            ...state,
            total: state.total + action.total
         };
      
      default: 
        return state;
    }
  };

  export const totalActual = (state) => {
    return state.totalReducer.total;
  }