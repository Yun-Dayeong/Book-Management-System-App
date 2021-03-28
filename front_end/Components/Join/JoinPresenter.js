import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity
} from 'react-native'

import {
    Header, 
    Left, 
    Body, 
    Right
} from 'native-base'

import Ionicons from 'react-native-vector-icons/Ionicons'

const JoinPresenter = (props) => {
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
                        <Text style={styles.headerBodyText}>Join</Text>
                    </Body>
                    <Right style={{flex : 1}}></Right>
                </Header>
            </View>
            <View style={{alignItems: 'center', marginTop: 150}}>
                <TextInput 
                    style={styles.textInputStyle}
                    placeholder="아이디를 입력하세요. "
                    placeholderTextColor="gray"
                    maxLength={20}
                    value={props.user_id}
                    onChangeText={text => props.input_id(text)}></TextInput>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="비밀번호를 입력하세요. "
                    placeholderTextColor="gray"
                    secureTextEntry={true}
                    maxLength={20}
                    value={props.user_password}
                    onChangeText={text => props.input_password(text)}></TextInput>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="이름을 입력하세요. "
                    placeholderTextColor="gray"
                    maxLength={20}
                    value={props.user_password}
                    onChangeText={text => props.input_name(text)}></TextInput>
                <TouchableOpacity style={{width: '70%', margin: 5}} onPress={() => props.join()}>
                    <Text style={styles.joinButton}>Join</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor:'white', 
        borderBottomColor: 'gray', 
        borderBottomWidth: 1
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
    joinButton: { 
        backgroundColor: '#4C4C4C', 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center', 
        borderRadius: 5, 
        padding: 10, 
    },
});

export default JoinPresenter;