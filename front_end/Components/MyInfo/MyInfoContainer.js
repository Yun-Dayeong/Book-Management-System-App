import React, { Component } from 'react';
import Snackbar from 'react-native-snackbar'

import MyInfoPresenter from './MyInfoPresenter'
import APIManager from '../APIManagers'

let am = new APIManager();

class MyInfoContainer extends Component {
    state = {
        bookData: [],

        modalVisible: false, 
        modalBookId: -1
    }

    componentDidMount = () => {
        this._selectBorrowBook()
    }

    _selectBorrowBook = () => {
        am.url = `http://192.168.0.2:4000/books/getBorrowBook/${this.props.userId}`

        am.get((data) => {
            if (data.msg === 200) {
                for (var i = 0; i < data.result.length; i++) {
                    am.url = `http://192.168.0.2:4000/books/getBook/${data.result[i].tb_book_id}`

                    am.get((data) => {
                        if (data.msg === 200) {
                            this.setState({
                                bookData: this.state.bookData.concat(data.result[0])
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
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ", 
                    duration: Snackbar.LENGTH_SHORT
                })
            }
        })
    }

    _return = (bookId) => {
        am.url = `http://192.168.0.2:4000/books/borrowUser/${bookId}`

        am.get((data) => {
            if (data.msg === 200) {
                am.url = "http://192.168.0.2:4000/books/returnBook"
                am.data = { borrowId: data.result[0].tb_borrow_id, bookId: bookId }

                am.post((data) => {
                    if (data.msg === 200) {
                        Snackbar.show({
                            text: "반납되었습니다. ", 
                            duration: Snackbar.LENGTH_SHORT
                        })
                        this.setState({
                            bookData: [], 
                            modalVisible : false, 
                            modalBookId: -1
                        })
                        this._selectBorrowBook()
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
                    text: "오류! 다시 시도해주세요. ", 
                    duration: Snackbar.LENGTH_SHORT
                })
            }
        })
    }

    _openModal = (bookId) => {
        this.setState({
            modalVisible : true, 
            modalBookId: bookId
        })
    }

    _closeModal = () => {
        this.setState({
            modalVisible : false, 
            modalBookId: -1
        })
    }

    render() {
        return (
            <MyInfoPresenter 
                {...this.state} 
                {...this.props} 
                return={this._return}
                openModal={this._openModal}
                closeModal={this._closeModal}></MyInfoPresenter>
        );
    }
}

export default MyInfoContainer;