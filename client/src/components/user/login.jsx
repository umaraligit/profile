import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import { authendicate } from './redux/operations';

import './style.scss';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = (event) => {
        const target = event.target,
              value = target.value,
              name = target.name;
        this.setState ({
            [name]: value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        let data = {
            username: username,
            password: password
        }
        this.props.authendicate(data);
    }

    componentDidUpdate() {
        const { history, user_data } = this.props;
        if(!_.isEmpty(user_data)) {
            if(user_data.status === 'OK') {
                history.push('/dashboard')
            } else {
                alert(user_data.status, user_data.response);
            }
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                <div className="login col-4">
                    <form>
                        <h4>Please Login to continue..</h4>
                        <input type="text" name="username" onBlur={this.handleChange} placeholder="Username" autoFocus autoComplete="off"/>
                        <input type="password" name="password" onBlur={this.handleChange} placeholder="Password" autoComplete="off"/>
                        <input type="submit" value="Login" onClick={this.handleSubmit} className="button"/>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user_data: state.auth.user_data
})

export default connect(mapStateToProps, {
    authendicate
})(User);
