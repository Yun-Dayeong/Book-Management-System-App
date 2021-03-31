import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native'

import Main from './Main'
import Login from './Login'
import Join from './Join'
import MyInfo from './MyInfo'
import BookRegister from './BookRegister'
import SessionManager from './SessionManagers';

const Drawer = createDrawerNavigator();
let sm = new SessionManager();

const HomeStack = (props) => {
    return (
        props.userManagement === 0 ?
            <Drawer.Navigator initialRouteName="Main"
                drawerContent={props_2 => {
                    return (
                        <DrawerContentScrollView {...props_2}>
                            <DrawerItemList {...props_2} />
                            <DrawerItem label="Logout" onPress={() => props.logout(props.navigation.dispatch(DrawerActions.closeDrawer()))} />
                        </DrawerContentScrollView>
                    )}}>
                <Drawer.Screen name="Main">
                    {props_2 => <Main {...props} {...props_2}/>}
                </Drawer.Screen>
                <Drawer.Screen name="MyInfo">
                    {props_2 => <MyInfo {...props} {...props_2}/>}
                </Drawer.Screen>
            </Drawer.Navigator>
            :
            props.userManagement === 1 ?
            <Drawer.Navigator initialRouteName="Main" 
                drawerContent={prop => {
                    return (
                        <DrawerContentScrollView {...prop}>
                            <DrawerItemList {...prop} />
                            <DrawerItem label="Logout" onPress={() => props.logout(props.navigation.dispatch(DrawerActions.closeDrawer()))} />
                        </DrawerContentScrollView>
                    )}}>
                <Drawer.Screen name="Main">
                    {props_2 => <Main {...props} {...props_2} />}
                </Drawer.Screen>
                <Drawer.Screen name="BookRegister">
                    {props_2 => <BookRegister {...props} {...props_2}/>}
                </Drawer.Screen>
            </Drawer.Navigator>
            :
            <Drawer.Navigator initialRouteName="Main">
                <Drawer.Screen name="Main">
                    {props_2 => <Main {...props} {...props_2}/>}
                </Drawer.Screen>
                <Drawer.Screen name="Login">
                    {props_2 => <Login {...props} {...props_2} />}
                </Drawer.Screen>
                <Drawer.Screen name="Join">
                    {props_2 => <Join {...props} {...props_2} />}
                </Drawer.Screen>
            </Drawer.Navigator>
    );
}


export default HomeStack;