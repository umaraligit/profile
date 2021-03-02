import ApiAxiosService from '../../../utils/ApiAxios';
import { setUserdetails } from './actions';

export const getUserdetails = (data) => (dispatch) => {
    console.log(data);
    const userId = data.response.id;
    ApiAxiosService
    .get('/user/get_details/'+userId, {
        headers: { Authorization: 'Bearer ' + data.response.token }
    })
    .then((res) => {
        dispatch(setUserdetails(res.data));
    })
    .catch(err => console.log('Error: ', err));
};
