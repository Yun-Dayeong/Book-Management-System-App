import React from 'react';
import Modal from 'react-native-modal';
import { 
    ScrollView,
    View,
    Text, 
    Image,
    StyleSheet, 
    TouchableOpacity, 
    RefreshControl,
} from 'react-native'
import {
    Header, 
    Left, 
    Body, 
    Right,
} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BookDetailPresenter = (props) => {
    return (
        <ScrollView>
            <Header style={styles.headerStyle}>
                <Left style={{flex : 1}}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons color="black" name="chevron-back-sharp" size={30}/>
                    </TouchableOpacity>
                </Left>
                <Body style={{flex : 2, alignItems: 'center'}}>
                    <Text style={styles.headerBodyText}>Book Detail</Text>
                </Body>
                <Right style={{flex : 1}}></Right>
            </Header>
            <View style={{alignItems: 'center', margin: 15}}>
                <Image style={styles.bookImage} source={{uri: props.bookImage ? props.bookImage : null}} />
            </View>
            <View style={{marginHorizontal: 15}}>
                <Text style={styles.bookTextTitle}>{props.bookName}</Text>
                <Text style={styles.bookTextAuthor}>{props.bookAuthor}</Text>
                <Text style={[styles.bookTextState, props.bookState === 1 ? {color: 'red'} : {color: 'blue'}]}>{props.bookState === 1 ? "대출 중" : "대출 가능"}</Text>
            </View>
            {props.userManagement === 0 ? 
            <View style={{alignItems :'center', marginTop: 20}}>
                {props.bookState === 0 ?
                <Text style={styles.button1} onPress={() => props.borrow()}>대출하기</Text>
                :
                <Text style={styles.button1} onPress={() => props.return()}>반납하기</Text>
                }
            </View>
            :
            props.userManagement === 1 ?
            <View style={{justifyContent: 'center', marginTop: 20, flexDirection: 'row'}}>
                <Text style={styles.button2} onPress={() => props.navigation.navigate('Book Update', { updateBookId: props.route.params.bookId })}>책 수정</Text>
                <Text style={styles.button2} onPress={() => props.openModal()}>책 삭제</Text>
            </View>
            :
            <View></View>
            }
            <Modal animationType="slide" isVisible={props.modalVisible}>
                <View style={{backgroundColor:"white", padding: 30}}>
                    <Text style={styles.ModalText}>삭제하시겠습니까? </Text>
                    <View style={styles.ModalButtonView}>
                        <TouchableOpacity onPress={() => props.deleteBook()}>
                            <Text style={styles.ModalButton}>확인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.closeModal()}>
                            <Text style={styles.ModalButton}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'white', 
        borderBottomColor: '#BDBDBD', 
        borderBottomWidth: 0.5
    }, 
    headerBodyText: {
        color: "black", 
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    bookImage: {
        width: 250, 
        height: 400, 
        borderWidth: 1, 
        borderColor: '#BDBDBD'
    }, 
    bookTextTitle: {
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold'
    },
    bookTextAuthor: {
        color: 'black', 
        fontSize: 15, 
    }, 
    bookTextState: { 
        fontSize: 15,
        marginVertical: 10 
    }, 
    button1: { 
        width: '95%', 
        backgroundColor: '#4C4C4C', 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center', 
        borderRadius: 5, 
        padding: 10, 
    },
    button2: { 
        width: '45%', 
        backgroundColor: '#4C4C4C', 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center', 
        borderRadius: 5, 
        padding: 10, 
        marginHorizontal: 5
    },
    ModalText: {
        color: 'black', 
        fontSize: 17, 
        fontWeight: 'bold',
    }, 
    ModalButtonView: {
        flexDirection: 'row', 
        justifyContent:'flex-end', 
        marginTop: 50
    }, 
    ModalButton: {
        paddingVertical: 10, 
        paddingHorizontal: 17, 
        backgroundColor: '#368AFF', 
        color: 'white', 
        fontSize: 13, 
        fontWeight: 'bold', 
        marginLeft: 10,
        borderRadius: 5
    }, 
});

export default BookDetailPresenter;