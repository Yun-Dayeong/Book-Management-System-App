import React, { Component } from 'react';
import * as ImagePicker from "react-native-image-picker"
import Snackbar from 'react-native-snackbar'
import APIManager from '../APIManagers';

import BookRegisterPresenter from './BookRegisterPresenter';

let am = new APIManager()

class BookRegisterContainer extends Component {
    state = {
        bookName : "", 
        bookAuthor : "",
        bookImage: "",
        imageViewURL: "", 
    }

    componentDidMount = () => {
        this._load()
    }

    _load = () => {
        this.props.navigation.addListener('focus', () => {
                this._resetData();
        });
    }

    _resetData = () => {
        this.setState({
            bookName : "", 
            bookAuthor : "",
            bookImage: "",
            imageViewURL: "",
            bookUpdate : 0
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

    _bookRegister = () => {
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
            //book register
            am.url = "http://192.168.0.2:4000/books/insertBook"
            am.data = { bookName: this.state.bookName, bookAuthor: this.state.bookAuthor }

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
                                text:"등록되었습니다. ", 
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
            <BookRegisterPresenter 
                {...this.props} 
                {...this.state}
                input_bookName={this._input_bookName}
                input_bookAuthor={this._input_bookAuthor}
                input_bookImage={this._input_bookImage}
                bookRegister={this._bookRegister}></BookRegisterPresenter>
        );
    }
}

export default BookRegisterContainer;