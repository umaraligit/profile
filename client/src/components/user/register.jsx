import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import { registerUser } from './redux/operations';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    }

    handleChange = (event) => {
        const target = event.target,
              value = target.value,
              name = target.name;
        this.setState ({
            [name]: value,
        });
    }

    validatePassword = (password, confirmPassword) => {
        let errorMessage = ''
        if(password === confirmPassword) {
            var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            if(regex.test(password)) {
                this.setState({password: password, error: ''});
            } else {
                errorMessage = 'at least 8 characters, 1 numeric character, 1 lowercase letter, 1 uppercase letter and 1 special character';
            }
        } else {errorMessage = 'Password are missmatched'}
        if (!_.isEmpty(errorMessage)) {
            this.setState({error: errorMessage});
        }
    }

    handlePassword = () => {
        const { password, confirmPassword } = this.state;
        this.validatePassword(password, confirmPassword);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { errorMessage, username, email, password } = this.state;
        if(_.isEmpty(errorMessage)) {
            const data = {
                username: username,
                email: email,
                password: password
            }
            this.props.registerUser(data);
        }
    }

    componentDidUpdate() {
        const { history, user_data } = this.props;
        if(!_.isEmpty(user_data)) {
            history.push('/login')
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                <div className="register col-4">
                    <form>
                        <h4>Register.</h4>
                        <input type="text" name="username" onChange={this.handleChange} placeholder="Username" autoFocus autoComplete="off"/>
                        <input type="text" name="email" onChange={this.handleChange} placeholder="Email" autoComplete="off"/>
                        <input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="off"/>
                        <input type="password" name="confirmPassword" onChange={this.handleChange} onBlur={this.handlePassword} placeholder="Confirm Password" autoComplete="off"/>
                        <input type="submit" value="Register" onClick={this.handleSubmit} className="button"/>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user_data: state.auth.registerUser
})

export default connect(mapStateToProps, {
    registerUser
})(Register);

