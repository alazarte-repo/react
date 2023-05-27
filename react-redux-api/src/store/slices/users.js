//Buena práctica: Tener tantas archivos dentro de 'slices' como reducers
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: []
    },
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        }
    },
});

export const {setUserList} = userSlice.actions; 

export default userSlice.reducer;

//Funciones que ejecutan las consultas asíncronas a la API
export const fetchAllUsers = () => (dispatch) => {
    axios
    .get('https://reqres.in/api/users?page=2')
    .then((response) => {
        dispatch(setUserList(response.data.data));
    })
    .catch((error) => {
        console.log(error);
    });
};