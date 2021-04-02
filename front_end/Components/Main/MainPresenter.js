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
    Right,
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
                <View style={styles.searchTextView}>
                    <TextInput
                        style={styles.searchTextInput}
                        placeholder="책 이름을 입력하세요. "
                        placeholderTextColor="gray"
                        maxLength={30}
                        value={props.searchText}
                        onChangeText={text => props.input_searchText(text)}
                    ></TextInput>
                    <Text style={styles.searchButton} onPress={() => props.search()}>Search</Text>
                </View>
            </View>
            <Text style={styles.bookTitle}>책 리스트</Text>
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
    searchTextView: {
        width: '100%', 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingBottom: 15, 
        borderBottomColor: '#BDBDBD', 
        borderBottomWidth: 0.5
    },
    searchTextInput: {
        width: '75%', 
        height: 40, 
        borderColor: '#3736FF',
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
        borderWidth: 1.5,
        paddingHorizontal: 10,
    }, 
    searchButton: {
        width:'15%', 
        height: 40, 
        backgroundColor: '#3736FF', 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        borderTopRightRadius: 5, 
        borderBottomRightRadius: 5, 
        borderWidth: 1.5, 
        color: 'white', 
        fontSize: 13, 
        fontWeight: 'bold', 
        borderColor: '#3736FF'
    }
});

export default MainPresenter;