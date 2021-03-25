import React, { Component } from 'react';
import Snackbar from 'react-native-snackbar'

import APIManager from '../APIManagers';
import JoinPresenter from './JoinPresenter'

let am = new APIManager;

class JoinContainer extends Component {
    state = {
        userId : "",
        userPassword : "", 
        userName : ""
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

    _input_name = (text) => {
        this.setState({
            userName: text
        })
    }

    _join = () => {
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
        else if (this.state.userName === "") {
            Snackbar.show({
                text: "이름을 입력하세요. ",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        else {
            am.url = "http://192.168.0.2:4000/users/join"
            am.data = { userId: this.state.userId, userPassword: this.state.userPassword, userName: this.state.userName, userManagement: 0 }

            am.post((data) => {
                if (data.msg === 200) {
                    Snackbar.show({
                        text: "회원가입 되었습니다. ",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    this.props.navigation.navigate('Login')
                }
                else if (data.msg === 202) {
                    Snackbar.show({
                        text: "이미 존재하는 아이디 입니다. ",
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
            <JoinPresenter 
                {...this.props}
                {...this.state}
                input_id = {this._input_id}
                input_password = {this._input_password}
                input_name = {this._input_name}
                join = {this._join}></JoinPresenter>
        );
    }
}

export default JoinContainer;