import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from "../actions/actionTypes";

const initialState = {
    notes: [],
    loginState: {},
    signUpState: {}
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "ADD_NOTES":
            return {
                ...state,
                notes: action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState: action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginState: action.payload
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signUpState: action.payload
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                signUpState: action.payload
            };
        default:
            return state;
    }
};

export default reducer;