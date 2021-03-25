import React, { Component } from 'react';
import Snackbar from 'react-native-snackbar'

import LoginPresenter from './LoginPresenter'
import APIManager from '../APIManagers'

let am = new APIManager();

class LoginContainer extends Component {
    state = {
        userId : "",
        userPassword : ""
    }

    _input_id = (text) => {
        this.setState({
            userId: text
        })
    }

    _input_password = (text) => {
        this.setState({
            userPassword: text
        })
    }

    _login = () => {
        if (this.state.userId === "") {
            Snackbar.show({
                text: "아이디를 입력하세요. ",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        else if (this.state.userPassword === "") {
            Snackbar.show({
                text: "비밀번호를 입력하세요. ",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        else {
            am.url = "http://192.168.0.2:4000/users/login"
            am.data = { userId: this.state.userId, userPassword: this.state.userPassword }

            am.post((data) => {
                if (data.msg === 200) {
                    //세션에 데이터 저장
                    this.props.login(data.result[0], this.props.navigation.navigate('Main'))
                }
                else if (data.msg === 204) {
                    Snackbar.show({
                        text: "아이디 또는 비밀번호가 잘못 입력되었습니다. ",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                else {
                    Snackbar.show({
                        text: "오류! 다시 시도해주세요. ",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            })
        }
    }

    render() {
        return (
            <LoginPresenter 
                {...this.props}
                {...this.state}
                input_id = {this._input_id}
                input_password = {this._input_password}
                login = {this._login}></LoginPresenter>
        );
    }
}

export default LoginContainer;