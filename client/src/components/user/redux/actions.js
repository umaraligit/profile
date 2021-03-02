export const AUTHENDICATE = 'USER/AUTHENDICATE';
export const REGISTER_USER = 'USER/REGISTER_USER';
export const REGISTER_USER_DETAILS = 'USER/REGISTER_USER_DETAILS'

export const setAuth = (payload) => ({type: AUTHENDICATE, payload});

export const setUser = (payload) => ({type: REGISTER_USER, payload});

export const setUserDetails = (payload) => ({type: REGISTER_USER_DETAILS, payload});