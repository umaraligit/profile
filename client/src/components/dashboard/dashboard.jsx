import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import { getUserdetails } from './redux/operations';
import { userDetails } from './details';
import './style.scss';

class Dashboard extends React.Component {
    

    componentDidMount() {
        const { user_data, history } = this.props;
        if(!_.isEmpty(user_data)) {
            this.props.getUserdetails(user_data);
        } else {
            history.push('/login');
        }
    }

    render() {
        const { user_details, user_data } = this.props;
 
        return (
            <div className="container-fluid">
                <div className="dashboard">
                    <div className="panel">
                        {userDetails(user_data, user_details)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user_data: state.auth.user_data,
    user_details: state.dashboard.user_details
});

export default connect(mapStateToProps, {
    getUserdetails
})(Dashboard);
