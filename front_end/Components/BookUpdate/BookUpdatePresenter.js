import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Image,
    TouchableOpacity
} from 'react-native'

import {
    Header, 
    Left, 
    Body, 
    Right
} from 'native-base'

import Ionicons from 'react-native-vector-icons/Ionicons'

const BookUpdatePresenter = (props) => {
    return (
        <View>
            <View>
                <Header style={styles.headerStyle}>
                    <Left style={{flex : 1}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Ionicons color="black" name="chevron-back-sharp" size={30}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex : 2, alignItems: 'center'}}>
                        <Text style={styles.headerBodyText}>Book Update</Text>
                    </Body>
                    <Right style={{flex : 1}}></Right>
                </Header>
            </View>
            <View style={{alignItems: 'center', marginTop: 80}}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="책 재목을 입력하세요. "
                    placeholderTextColor="gray"
                    value={props.bookName}
                    onChangeText={(text) => props.input_bookName(text)}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="책 작가를 입력하세요. "
                    placeholderTextColor="gray"
                    value={props.bookAuthor}
                    onChangeText={(text) => props.input_bookAuthor(text)}
                />
                <Image style={styles.bookImage} source={{uri: props.imageViewURL ? props.imageViewURL : null}}/>
                <Text style={styles.bookImageButton} onPress={() => props.input_bookImage()}>Select Image</Text>
            </View>
            <View style={{justifyContent: 'center', marginTop: 20, flexDirection: 'row'}}>
                <Text style={styles.button} onPress={() => {props.bookUpdate()}}>책 수정</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor:'white', 
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
    textInputStyle: {
        width: '70%', 
        height: 40, 
        borderColor: 'black', 
        borderRadius: 5,
        borderWidth: 1.5, 
        paddingHorizontal: 10, 
        margin: 5
    },
    bookImageButton: { 
        color: '#3736FF', 
        fontSize: 15, 
        textAlign: 'center',
        textAlignVertical: 'center',  
    },
    bookImage: {
        width: 150,
        height: 240, 
        backgroundColor: '#D5D5D5', 
        margin: 10
    }, 
    button: { 
        width: '70%', 
        backgroundColor: '#4C4C4C', 
        color: 'white', 
        fontSize: 15, 
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center', 
        borderRadius: 5, 
        padding: 10, 
        marginHorizontal: 5
    },
});

export default BookUpdatePresenter;