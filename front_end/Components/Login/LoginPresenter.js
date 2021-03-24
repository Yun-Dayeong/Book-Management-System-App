import React from 'react';
import { 
    View, 
    Button,
    TextInput
} from 'react-native'

const LoginPresenter = (props) => {
    return (
        <View>
            <TextInput 
                placeholder="아이디를 입력하세요. "
                placeholderTextColor="black"
                maxLength={20}
                value={props.user_id}
                onChangeText={text => props.input_id(text)}></TextInput>
            <TextInput 
                placeholder="비밀번호를 입력하세요. "
                placeholderTextColor="black"
                maxLength={20}
                value={props.user_password}
                onChangeText={text => props.input_password(text)}></TextInput>
            <Button
                title="Login"
                onPress={() => props.login()}
            />
        </View>
    );
};

export default LoginPresenter;