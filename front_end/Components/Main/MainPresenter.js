import React from 'react';
import { 
    ScrollView,
    View,
    Text, 
    TextInput,
    Image,
    StyleSheet, 
    TouchableOpacity, 
    RefreshControl,
} from 'react-native'
import {
    Header, 
    Left, 
    Body, 
    Right
} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const MainPresenter = (props) => {
    return (
        <ScrollView
            onScrollEndDrag={(e) => {
                const scrollPosition = e.nativeEvent.contentOffset.y;
                const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
                const contentHeight = e.nativeEvent.contentSize.height;
                const isScrolledToBottom = scrollViewHeight + scrollPosition;

                if (isScrolledToBottom >= (contentHeight-5)) {
                    props.moreData()
                }
            }}
            refreshControl={
                <RefreshControl refreshing={props.refreshing} onRefresh={() => props.onRefresh()} />
            }
            >
            <View>
                <Header style={styles.headerStyle}>
                    <Left style={{flex : 1}}>
                        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                            <Ionicons color="black" name="menu" size={30}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex : 2, alignItems: 'center'}}>
                        <Text style={styles.headerBodyText}>Main</Text>
                    </Body>
                    <Right style={{flex : 1}}></Right>
                </Header>
            </View>
            <Text style={styles.bookTitle}>등록된 책</Text>
            <View style={{flex: 1, width: '100%'}}>
                <View style={styles.bookView}>
                    {props.bookData.map((book, index) => 
                            <View key={book.tb_book_id} style={styles.bookView2}>
                                <TouchableOpacity style={{alignItems: "center"}} onPress={() => {props.navigation.navigate('BookDetail', { bookId: book.tb_book_id })}}>
                                    <Image style={styles.bookimage} source={{uri: book.tb_book_image}}/>
                                    <Text style={styles.bookText_title} numberOfLines={1}>{book.tb_book_name}</Text>
                                    <Text style={styles.bookText_author} numberOfLines={1}>{book.tb_book_author}</Text>
                                </TouchableOpacity>
                            </View>
                    )}
                </View>
                <View style={{width:'100%', height:50, justifyContent: 'center', alignItems: "center"}}>
                    {props.gifImage ?
                    <Image source={require("../../Image/loading.gif")} style={{width: 30, height: 30}} />
                    :
                    <Text>{props.scrollMsg}</Text>
                    }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor:'white', 
    }, 
    headerBodyText: {
        color: "black", 
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    bookTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold', 
        marginHorizontal: 20, 
        marginTop: 20, 
    },
    bookView: {
        flexDirection:"row",
        flexWrap:"wrap", 
        marginHorizontal: 10, 
    },
    bookView2: {
        width:'50%', 
        padding: 10, 
        paddingBottom: 20 
    },
    bookimage: {
        width: "100%",
        height: 250, 
        borderColor: '#D5D5D5', 
        borderWidth: 0.5, 
    }, 
    bookText_title: {
        color: 'black', 
        fontSize: 15, 
        fontWeight: 'bold'
    },
    bookText_author: {
        color: 'black', 
        fontSize: 13, 
    }, 
});

export default MainPresenter;