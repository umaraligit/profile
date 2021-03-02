import {combineReducers} from 'redux';

// Component Reducers
import authReducer from '../components/user/redux/reducers';
import dashboardReducer from '../components/dashboard/redux/reducers'

// Combine Reducers
export default combineReducers({
    auth   :   authReducer,
    dashboard: dashboardReducer
})
