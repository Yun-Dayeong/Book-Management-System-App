import React from 'react';
import Modal from 'react-native-modal';
import { 
    StyleSheet, 
    ScrollView, 
    View,
    Text, 
    TouchableOpacity, 
    Image, 
    Button
} from 'react-native'

import {
    Header, 
    Left, 
    Body, 
    Right
} from 'native-base'

import Ionicons from 'react-native-vector-icons/Ionicons'

const MyInfoPresenter = (props) => {
    return (
        <ScrollView>
            <View>
                <Header style={styles.headerStyle}>
                    <Left style={{flex : 1}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Ionicons color="black" name="chevron-back-sharp" size={30}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex : 2, alignItems: 'center'}}>
                        <Text style={styles.headerBodyText}>My Info</Text>
                    </Body>
                    <Right style={{flex : 1}}></Right>
                </Header>
            </View>
            <View style={styles.userInfoView}>
                <Ionicons  color="black" name="md-person-circle-outline" size={80} />
                <View style={{justifyContent:'center', marginLeft: 5}}>
                    <Text style={styles.userInfoText}>아이디 : {props.userId}</Text>
                    <Text style={styles.userInfoText}>이름 : {props.userName}</Text>
                </View>
            </View>
            <Text style={styles.borrowBookTitle}>대출한 책</Text>
            <View style={{flex: 1, width: '100%'}}>
                <View style={styles.borrowBookView}>
                    {props.bookData.map((book, index) => 
                            <View key={book.tb_book_id} style={styles.borrowBookView2}>
                                <TouchableOpacity style={{alignItems: "center"}} onPress={() => {props.openModal(book.tb_book_id)}}>
                                    <Image style={styles.borrowBookimage} source={{uri: book.tb_book_image}}/>
                                    <Text style={styles.borrowBookText_title} numberOfLines={1}>{book.tb_book_name}</Text>
                                    <Text style={styles.borrowBookText_author} numberOfLines={1}>{book.tb_book_author}</Text>
                                </TouchableOpacity>
                            </View>
                    )}
                </View>
            </View>
            
            <Modal animationType="slide" isVisible={props.modalVisible}>
                <View style={{backgroundColor:"white", padding: 30}}>
                    <Text style={styles.ModalText}>반납하시겠습니까? </Text>
                    <View style={styles.ModalButtonView}>
                        <TouchableOpacity onPress={() => props.return(props.modalBookId)}>
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
    userInfoView: {
        flexDirection: 'row', 
        backgroundColor:"white", 
        margin: 20, 
        padding: 10, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: 'gray'
    },
    userInfoText: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        margin: 1, 
    },
    borrowBookTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold', 
        marginHorizontal: 20, 
    },
    borrowBookView: {
        flexDirection:"row",
        flexWrap:"wrap", 
        marginHorizontal: 10, 
    },
    borrowBookView2: {
        width:'50%', 
        padding: 10, 
        paddingBottom: 20 
    },
    borrowBookimage: {
        width: "100%",
        height: 250, 
        borderColor: '#D5D5D5', 
        borderWidth: 0.5, 
    }, 
    borrowBookText_title: {
        color: 'black', 
        fontSize: 15, 
        fontWeight: 'bold'
    },
    borrowBookText_author: {
        color: 'black', 
        fontSize: 13, 
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

export default MyInfoPresenter;