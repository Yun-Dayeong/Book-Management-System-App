import React from 'react';
import { 
    View,
    Text, 
    Button
} from 'react-native'

const MainPresenter = (props) => {
    return (
        <View>
            <Text>Main</Text>
            <Button
                title="Go to Details"
                onPress={() => props.navigation.navigate('BookDetail')}
            />
        </View>
    );
};

export default MainPresenter;