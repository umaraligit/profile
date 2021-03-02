import { USER_DETAILS } from './actions';

const initialState = {
    user_details: {}
};

export default function reducer(state = initialState, {type, payload}) {
    switch(type) {
        case USER_DETAILS:
            return {
                ...state,
                user_details: payload
            }
        default:
            return state;
    }
};
