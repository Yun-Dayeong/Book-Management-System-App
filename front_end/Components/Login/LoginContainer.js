import React, { Component } from 'react';
import LoginPresenter from './LoginPresenter'

class LoginContainer extends Component {
    render() {
        return (
            <LoginPresenter {...this.props}></LoginPresenter>
        );
    }
}

export default LoginContainer;