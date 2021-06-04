import axios from 'axios';
import {
    ADD_NOTES,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from './actionTypes';

const networkError = {
    message: "NETWORK ERROR",
    data: {}
}

const baseUrl = "http://localhost:3000/usuarios/";

export const addNotes = (data) => {
    return {
        type: ADD_NOTES,
        payload: data
    };
};

export const signUpSuccess = (data) =>{
    return {
        type: SIGNUP_SUCCESS,
        payload: data
    };
}

export const signUpError = () =>{
    return {
        type: SIGNUP_ERROR,
        payload: networkError
    };
}

export const loginSuccess = (data) =>{
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}

export const loginError = (data) =>{
    return {
        type: LOGIN_ERROR,
        payload: data || networkError
    };
}

export const signUp = (obj) =>{
    return dispatch =>{
    return axios.post(`${baseUrl}sign-up`, obj).then((res)=>{
        if(res.status === 200){
            localStorage.setItem('token',res.data.data.token);
            dispatch(signUpSuccess(res.data))
        }
        else{
            localStorage.setItem('token','');
            dispatch(signUpError(res.data))
        }
    }).catch((e)=>{
        console.log(e)
        dispatch(signUpError())
    })
}
}

export const login = (obj) =>{
    return dispatch =>{
        return axios.post(`${baseUrl}login`, obj).then((res)=>{
            if(res.status === 200 && res.data){
                console.log("res ", res);
                localStorage.setItem('token',res.data.data.token);
                dispatch(loginSuccess(res.data))
            }
            else{
                localStorage.setItem('token','');
                dispatch(loginError(res.data))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(loginError())
        })
    }
}

// export const storeResult = ( res ) => {
//     return dispatch => {
//         setTimeout( () => {
//             dispatch(saveResult(res));
//         }, 2000 );
//     }
// };
