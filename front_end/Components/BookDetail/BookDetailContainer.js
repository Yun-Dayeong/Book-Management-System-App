import React, { Component } from 'react';
import Snackbar from 'react-native-snackbar'

import APIManager from '../APIManagers';
import BookDetailPresenter from './BookDetailPresenter'

let am = new APIManager();

class BookDetailContainer extends Component {
    state = {
        bookName : "", 
        bookAuthor : "", 
        bookState : -1, 
        bookImage : "", 

        modalVisible: false
    }

    componentDidMount = () => {
        this._load()
    }

    _load = () => {
        this.props.navigation.addListener('focus', () => {
            this._selectBookData();
        });
    }

    _selectBookData = () => {
        am.url = `http://192.168.0.2:4000/books/getBook/${this.props.route.params.bookId}`

        am.get((data) => {
            if (data.msg === 200) {
                this.setState({
                    bookName : data.result[0].tb_book_name, 
                    bookAuthor : data.result[0].tb_book_author, 
                    bookState : data.result[0].tb_book_state, 
                    bookImage : data.result[0].tb_book_image, 
                    modalVisible: false
                })
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT
                })
            }
        })
    }

    _borrow = () => {
        am.url = "http://192.168.0.2:4000/books/borrowBook"
        am.data = { userId: this.props.userId, bookId: this.props.route.params.bookId }

        am.post((data) => {
            if (data.msg === 200) {
                Snackbar.show({
                    text: "대출되었습니다. ",
                    duration: Snackbar.LENGTH_SHORT
                })
                this._selectBookData()
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT
                })
            }
        })
    }

    _return = () => {
        am.url = `http://192.168.0.2:4000/books/borrowUser/${this.props.route.params.bookId}`

        am.get((data) => {
            if (data.msg === 200) {
                if (data.result[0].tb_user_id === this.props.userId) {
                    am.url = "http://192.168.0.2:4000/books/returnBook"
                    am.data = { borrowId: data.result[0].tb_borrow_id, bookId: this.props.route.params.bookId }

                    am.post((data) => {
                        if (data.msg === 200) {
                            Snackbar.show({
                                text: "반납되었습니다.  ",
                                duration: Snackbar.LENGTH_SHORT
                            })
                            this._selectBookData()
                        }
                        else {
                            Snackbar.show({
                                text: "오류! 다시 시도해주세요. ",
                                duration: Snackbar.LENGTH_SHORT
                            })
                        }
                    })
                }
                else {
                    Snackbar.show({
                        text: "본인이 대출한 책이 아닙니다. ",
                        duration: Snackbar.LENGTH_SHORT
                    })
                }
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT
                })
            }
        })
    }

    _openModal = () => {
        this.setState({
            modalVisible : true, 
        })
    }

    _closeModal = (callback = null) => {
        this.setState({
            modalVisible : false, 
        })
        if(callback){
            callback
        }
    }

    _deleteBook = () => {
        am.url = "http://192.168.0.2:4000/books/deleteBook"
        am.data = { bookId: this.props.route.params.bookId }

        am.post((data) => {
            if (data.msg === 200) {
                this._closeModal(() => {
                    Snackbar.show({
                        text: "삭제되었습니다. ",
                        duration: Snackbar.LENGTH_SHORT
                    })
                    this.props.navigation.goBack()
                })
            }
            else if (data.msg === 202) {
                Snackbar.show({
                    text: "대출 상태의 책 입니다. ",
                    duration: Snackbar.LENGTH_SHORT
                })
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT
                })
            }
        })
    }

    render() {
        return (
            <BookDetailPresenter 
                {...this.props}
                {...this.state}
                borrow={this._borrow}
                return={this._return}
                openModal={this._openModal}
                closeModal={this._closeModal}
                deleteBook={this._deleteBook}></BookDetailPresenter>
        );
    }
}

export default BookDetailContainer;