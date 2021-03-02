import { AUTHENDICATE, REGISTER_USER, REGISTER_USER_DETAILS } from './actions';

const initialState = {
    user_data: {},
    registerUser: {},
    registerUserDetails: {}
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
        default:
            return state;
    }
};
