import React, { Component } from 'react';
import Snackbar from 'react-native-snackbar';

import MainPresenter from './MainPresenter'
import APIManager from '../APIManagers'

let am = new APIManager();

class MainContainer extends Component {

    state = {
        bookData : [],
        scrollMsg : "",
        gifImage : false, 

        searchText : "", 

        refreshing : false, 
    }

    componentDidMount = () => {
        this._load();
    }

    _load = () => {
        this.props.navigation.addListener('focus', () => {
            this._selectBook();
        });
    }

    _selectBook = () => {
        am.url = "http://192.168.0.2:4000/books/getMainBook"
        am.params = {}

        am.get((data) => {
            if (data.msg === 200) {
                this.setState({
                    scrollMsg: "", 
                    searchText : "", 
                    gifImage : false,
                    bookData: data.result
                })
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        })
    }

    _moreData = () => {
        this.setState({
            gifImage: true,
            scrollMsg: ""
          })

        var nextId = this.state.bookData[this.state.bookData.length - 1].tb_book_id

        am.url = "http://192.168.0.2:4000/books/getMainBook"
        am.params = { nextId: nextId }

        am.get((data) => {
            if (data.msg === 200) {
                if (data.result.length === 0) {
                    this.setState({
                        gifImage : false, 
                        scrollMsg: "end"
                    })
                }
                else {
                    this.setState({
                        gifImage : false,
                        bookData: this.state.bookData.concat(data.result), 
                    })
                }
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        })
    }

    _input_searchText = (text) => {
        this.setState({
            searchText : text
        })
    }

    _search = () => {
        am.url = "http://192.168.0.2:4000/books/getAllBook"

        am.get((data) => {
            if (data.msg === 200) {
                data = data.result.filter(book => {
                    return book.tb_book_name.includes(this.state.searchText)
                })
                this.setState({
                    bookData: data
                })
            }
            else {
                Snackbar.show({
                    text: "오류! 다시 시도해주세요. ",
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        })
    }

    _onRefresh = () => {
        this.setState({
          refreshing: true
        })
        this._selectBook()
        this.setState({
          refreshing: false
        })
    }

    render() {
        return (
            <MainPresenter 
                {...this.props}
                {...this.state}
                moreData={this._moreData}
                input_searchText={this._input_searchText}
                onRefresh={this._onRefresh}
                search={this._search}></MainPresenter>
        );
    }
}

export default MainContainer;