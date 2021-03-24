import React, { Component } from 'react';
import JoinPresenter from './JoinPresenter'

class JoinContainer extends Component {
    render() {
        return (
            <JoinPresenter {...this.props}></JoinPresenter>
        );
    }
}

export default JoinContainer;