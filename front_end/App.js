import * as React from 'react';
import Snackbar from 'react-native-snackbar'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Components/HomeStack'
import BookDetail from './Components/BookDetail'
import SessionManager from './Components/SessionManagers';

const Stack = createStackNavigator();
let sm = new SessionManager();

class App extends React.Component {

  state = {
    userId : "", 
    userPassword : "",
    userManagement : -1, 
    userName : ""
  }

  componentDidMount = () => {
      //자동 로그인
      sm.getSessionData("token", (result) => {
          if(result !== null){
              this.setState({
                  userId: result.id,
                  userPassword: result.password,
                  userManagement : result.management, 
                  userName: result.name
              })
          }
      })
  }

  _login = (data, callback) => {
      sm.setSessionData("token", data, (result) => {
          if(result===1){
              this.setState({
                  userId: data.tb_user_id,
                  userPassword: data.tb_user_password,
                  userManagement : data.tb_user_management, 
                  userName : data.tb_user_name
              })
              Snackbar.show({
                  text: "로그인 되었습니다. ", 
                  duration: Snackbar.LENGTH_SHORT,
              })
              if(callback){
                  callback
              }
          }
      })
  }

  _logout = (callback) => {
      sm.rmSessionData('token', () => {
          this.setState({
              userId : "", 
              userPassword : "",
              userManagement : -1, 
              userName : ""
          })
          Snackbar.show({
              text: '로그아웃...',
              duration: Snackbar.LENGTH_LONG,
          });
          if(callback){
              callback
          }
      })
  }

  render() {
      return (
          <NavigationContainer>
              <Stack.Navigator 
                  initialRouteName="Home"
                  screenOptions={{
                      headerShown: false
                  }}
              >
                  <Stack.Screen name="Home">
                      {(props) => <Home {...props} {...this.state} login = {this._login} logout = {this._logout} /> }
                  </Stack.Screen>
                  <Stack.Screen name="BookDetail">
                      {(props) => <BookDetail {...props} {...this.state} /> }
                  </Stack.Screen>
              </Stack.Navigator>
          </NavigationContainer>
      );
  }
}


export default App;
