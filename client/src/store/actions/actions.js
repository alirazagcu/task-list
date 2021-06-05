import axios from 'axios';
import {
    ADD_NOTES_SUCCESS,
    ADD_NOTES_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_ERROR,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_ERROR,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_ERROR
} from './actionTypes';

const networkError = "NETWORK ERROR";

const baseUrl = "http://localhost:3000/usuarios/";
const baseUrl1 = "http://localhost:3000/tareas/"

export const deleteNotesSuccess = (data) => {
    return {
        type: DELETE_NOTES_SUCCESS,
        payload: data
    };
};
export const deleteNotesError = (data) => {
    return {
        type: DELETE_NOTES_ERROR,
        payload: data || networkError
    };
};

export const updateNotesSuccess = (data) => {
    return {
        type: UPDATE_NOTES_SUCCESS,
        payload: data
    };
};
export const updateNotesError = (data) => {
    return {
        type: UPDATE_NOTES_ERROR,
        payload: data || networkError
    };
};

export const fetchNotesSuccess = (data) => {
    return {
        type: FETCH_NOTES_SUCCESS,
        payload: data
    };
};
export const fetchNotesError = (data) => {
    return {
        type: FETCH_NOTES_ERROR,
        payload: data || networkError
    };
};

export const addNotesSuccess = (data) => {
    return {
        type: ADD_NOTES_SUCCESS,
        payload: data
    };
};
export const addNotesError = (data) => {
    return {
        type: ADD_NOTES_ERROR,
        payload: data || networkError
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
                dispatch(addNotesError(res.data))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(addNotesError())
        })
    }
}

export const addNotes = (obj) =>{
    const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}agregar`, obj, token).then((res)=>{
            if(res.status === 200 && res.data){
                dispatch(addNotesSuccess(res.data))
            }
            else{
                dispatch(addNotesError(res.data))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(addNotesError())
        })
    }
}

export const fetchNotes = () =>{
    const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}mostrar`, token).then((res)=>{
            if(res.status === 200 && res.data){
                dispatch(fetchNotesSuccess(res.data))
            }
            else{
                dispatch(fetchNotesError(res.data && res.data.message && res.data.message.length===0 ? "No todo list found": ""));
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(fetchNotesError())
        })
    }
}

export const updateNotes = (obj) =>{
    // const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}actualizar`, obj).then((res)=>{
            if(res.status === 200 && res.data){
                dispatch(updateNotesSuccess(res.data))
            }
            else{
                dispatch(updateNotesError(res.data));
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(updateNotesError())
        })
    }
}

export const deleteNotes = (obj) =>{
    // const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}eliminar`, obj).then((res)=>{
            if(res.status === 200 && res.data){
                dispatch(deleteNotesSuccess("Successfully deleted"))
            }
            else{
                dispatch(deleteNotesError("Server"));
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(deleteNotesError())
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
