import ApiAxiosService from '../../../utils/ApiAxios';
import { clear, setAuth, setError, setUser, setUserDetails } from './actions';

export const authendicate = (data) => (dispatch) => {
    ApiAxiosService
    .post('/user/authendicate', {data}, )
    .then((res) => dispatch(setAuth(res.data)))
    .catch(err => dispatch(setError(err)));
};

export const registerUser = (data) => (dispatch) => {
    ApiAxiosService
    .post('user/create_user', {data})
    .then((res) => dispatch(setUser(res.data)))
    .catch(err => dispatch(setError(err)));
}

export const registerUserDetails = (user, data) => (dispatch) => {
    console.log('ref', user, data);
    ApiAxiosService
    .post('user/'+ user.id +'/create_user_details', data, {
        headers: { Authorization: 'Bearer ' + user.token, 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
        dispatch(setUserDetails(res.data));
    })
    .catch(err => dispatch(setError(err)));
}

export const clearError = () => (dispatch) => {
    dispatch(clear())
}
