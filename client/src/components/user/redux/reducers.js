import { AUTHENDICATE, REGISTER_USER, REGISTER_USER_DETAILS, USER_ERROR, CLEAR } from './actions';

const initialState = {
    user_data: {},
    registerUser: {},
    registerUserDetails: {},
    user_error: {}
};

export default function reducer(state = initialState, {type, payload}) {
    switch(type) {
        case AUTHENDICATE:
            return {
                ...state,
                user_data: payload
            }
        case REGISTER_USER:
            return {
                ...state,
                registerUser: payload
            }
        case REGISTER_USER_DETAILS:
            return {
                ...state,
                registerUserDetails: payload
            }
        case USER_ERROR:
            return {
                ...state,
                user_error: payload
            }
        case CLEAR:
            return {
                user_error: {}
            }
        default:
            return state;
    }
};
