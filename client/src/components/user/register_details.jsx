import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import { registerUserDetails, clearError } from './redux/operations';

class RegisterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            salary: '',
            doj: '',
            dob: '',
            education: '',
            city: '',
            avatar: ''
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

    handleFile = (event) => {
        this.setState ({avatar: event.target.files[0]});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user_data } = this.props;
        let user_form = document.getElementById('user_form');
        const formData = new FormData(user_form);
        this.props.registerUserDetails(user_data.response, formData);
    }

    handleClose = () => {
        this.props.clearError()
    }

    componentDidMount() {
        const { user_data, user_details, history } = this.props;
        if(_.isEmpty(user_data)) {
            history.push('/login');
        }
        if(!_.isEmpty(user_details)) {
            history.push('/dashboard');
        }
    }

    render() {
        const { error } = this.props;
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                <div className="register col-4">
                { (!_.isEmpty(error.message)) 
                ? <Alert variant="danger" onClose={this.handleClose} dismissible>
                    <p>{error.message}</p>
                  </Alert>: <></>}
                    <form id='user_form'>
                        <h4>Enter User Details.</h4>
                        <input type="text" name="jobTitle" onChange={this.handleChange} placeholder="Job Title" autoFocus autoComplete="off"/>
                        <input type="number" name="salary" onChange={this.handleChange} placeholder="Salary" autoComplete="off"/>
                        <input type="text" name="education" onChange={this.handleChange} placeholder="Qualification" autoComplete="off"/>
                        <input type="date" name="doj" onChange={this.handleChange} placeholder="Date of Join" autoComplete="off"/>
                        <input type="date" name="dob" onChange={this.handleChange} placeholder="Date of Birth" autoComplete="off"/>
                        <input type="text" name="city" onChange={this.handleChange} placeholder="City" autoComplete="off"/>
                        <input type="file" name="avatar" onChange={this.handleFile} placeholder="Choose Avatar" autoComplete="off"/>
                        <input type="submit" value="Register" onClick={this.handleSubmit} className="button"/>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user_data: state.auth.user_data,
    user_details: state.auth.registerUserDetails,
    error: state.auth.user_error
})

export default connect(mapStateToProps, {
    registerUserDetails,
    clearError
})(RegisterDetails);

