import React, { Component } from 'react';
import * as ImagePicker from "react-native-image-picker"
import Snackbar from 'react-native-snackbar'

import APIManager from '../APIManagers';
import BookUpdatePresenter from './BookUpdatePresenter'

let am = new APIManager()

class BookUpdateContainer extends Component {
    state = {
        bookName: "",
        bookAuthor: "",

        bookImage: "",
        imageViewURL: ""
    }

    componentDidMount = () => {
        this._load();
    }

    _load = () => {
        this.props.navigation.addListener('focus', () => {
            this._selectBookData();
        });
    }

    _selectBookData = () => {
        am.url = `http://192.168.0.2:4000/books/getBook/${this.props.route.params.updateBookId}`

        am.get((data) => {
            if (data.msg === 200) {
                this.setState({
                    bookName: data.result[0].tb_book_name,
                    bookAuthor: data.result[0].tb_book_author,
                    imageViewURL: data.result[0].tb_book_image,
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

    _input_bookName = (text) => {
        this.setState({
            bookName : text
        })
    }

    _input_bookAuthor = (text) => {
        this.setState({
            bookAuthor : text
        })
    }

    _input_bookImage = () => {
        ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response) => {
            console.log('Response =', response);

            this.setState({
                bookImage: {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                }, 
                imageViewURL: response.uri
            })
        })
    }

    _bookUpdate = () => {

        if (this.state.bookName === "") {
            alert("책 이름을 입력하세요. ")
        }
        else if (this.state.bookAuthor === "") {
            alert("작가를 입력하세요. ")
        }
        else if (this.state.imageViewURL === "") {
            alert("책 이미지를 입력하세요. ")
        }
        else {
            //book update
            am.url = "http://192.168.0.2:4000/books/updateBook"
            am.data = { bookId: this.props.route.params.updateBookId, bookName: this.state.bookName, bookAuthor: this.state.bookAuthor }

            am.post((data) => {
                if (data.msg === 200) {
                    //image register
                    var formData = new FormData();
                    formData.append("bookId", data.result.insertId)
                    formData.append("file", this.state.bookImage)
                    am.url = "http://192.168.0.2:4000/books/insertBookImage";
                    am.data = formData;

                    am.post((data) => {
                        if (data.msg === 200) {
                            Snackbar.show({
                                text:"수정되었습니다.  ", 
                                duration: Snackbar.LENGTH_SHORT
                            })
                            this.props.navigation.goBack()
                        }
                        else {
                            Snackbar.show({
                                text:"오류! 다시 시도해주세요. ", 
                                duration: Snackbar.LENGTH_SHORT
                            })
                        }
                    })
                }
                else {
                    Snackbar.show({
                        text:"오류! 다시 시도해주세요. ", 
                        duration: Snackbar.LENGTH_SHORT
                    })
                }
            })
        }
    }

    render() {
        return (
            <BookUpdatePresenter 
            {...this.props} 
            {...this.state}
            input_bookName={this._input_bookName}
            input_bookAuthor={this._input_bookAuthor}
            input_bookImage={this._input_bookImage}
            bookUpdate={this._bookUpdate}></BookUpdatePresenter>
        );
    }
}

export default BookUpdateContainer;