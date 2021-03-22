import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Main from './Main'
import Login from './Login'

const Drawer = createDrawerNavigator();

const HomeStack = () => {
    return (
        <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen name="Main" component={Main} />
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
    );
};

export default HomeStack;