import React, { Component } from 'react';
import BookDetailPresenter from './BookDetailPresenter'

class BookDetailContainer extends Component {

    componentDidMount = () => {
        console.log(this.props.route.params.bookId)
    }

    render() {
        return (
            <BookDetailPresenter></BookDetailPresenter>
        );
    }
}

export default BookDetailContainer;