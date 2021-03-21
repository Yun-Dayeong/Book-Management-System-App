import React, { Component } from 'react';
import MainPresenter from './MainPresenter'

class MainContainer extends Component {
    render() {
        return (
            <MainPresenter {...this.props}></MainPresenter>
        );
    }
}

export default MainContainer;