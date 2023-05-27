//Actions, me dirá qué debe hacer el reducer
const depositar = () => {
    return {
        type: 'PUT_MONEY',
        total: 10,
    };
};

const extraer = () => {
    return {
        type: 'GET_MONEY',
        total: -10,
    };
};

export {depositar, extraer};