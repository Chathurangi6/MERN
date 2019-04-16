import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import HeaderBar from '../layout/HeaderBar';
import LinkButtons from '../layout/LinkButtons'
import SubmitButtons from '../layout/SubmitButtons'

const title = {
    pageTitle: 'Forgot Password Screen',
};

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
            showNullError: false,
        };
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sendEmail = (e) => {
        e.preventDefault();
        const { email } = this.state;
        if (email === '') {
            this.setState({
                showError: false,
                messageFromServer: '',
                showNullError: true,
            });
        } else {
            axios
                .post('http://localhost:4000/api/users/forgotPassword', {
                    email,
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === 'recovery email sent') {
                        this.setState({
                            showError: false,
                            messageFromServer: 'recovery email sent',
                            showNullError: false,
                        });
                    }
                })
                .catch((error) => {
                    //  console.error(error.response.data);
                    if (error.response.data === 'email not in db') {
                        this.setState({
                            showError: true,
                            messageFromServer: '',
                            showNullError: false,
                        });
                    }
                });
        }
    };

    render() {
        const {
            email, messageFromServer, showNullError, showError
        } = this.state;

        return (
            <div>

                <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', margin: '30px', width: "600px" }}>
                
                    <HeaderBar title={title} />
                    <div className="col s8 offset-s2">
                    <form className="profile-form" onSubmit={this.sendEmail}>
                        <TextField
                            id="email"
                            label="email"
                            value={email}
                            onChange={this.handleChange('email')}
                            placeholder="Email Address"
                        />
                        <SubmitButtons
                            buttonText="Send Password Reset Email"
                        />
                    </form>

                    {showNullError && (
                        <div>
                            <p>The email address cannot be null.</p>
                        </div>
                    )}
                    {showError && (
                        <div>
                            <p>
                                That email address isn't recognized. Please try again or contact admin
                                for a new account.
            </p>
                        </div>
                    )}
                    {messageFromServer === 'recovery email sent' && (
                        <div>
                            <h3>Password Reset Email Successfully Sent!</h3>
                        </div>
                    )}
                    <LinkButtons buttonText="Go Home" link="/" />
                </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;