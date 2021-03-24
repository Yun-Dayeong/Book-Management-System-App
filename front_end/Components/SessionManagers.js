import AsyncStorage from '@react-native-community/async-storage'

export default class SessionManager {
    
    //세션 저장
    setSessionData = (token, data, callback) => {
        AsyncStorage.setItem(token, JSON.stringify(
            { 
                "id": data.tb_user_id, 
                "password": data.tb_user_password, 
                "name": data.tb_user_name, 
                "management": data.tb_user_management 
            }))
        .then(() => { if (callback) { callback(1) } })
        .catch(function (error) {
            console.log('set Error ' + error);     
        });
    }

    //세션 불러오기
    getSessionData = (token, callback) => {
        AsyncStorage.getItem(token).then((result) => {
            const userData = JSON.parse(result);
            var data = {};
            if(userData !== null){
                data = {
                    "id" : userData.id, 
                    "password" : userData.password,
                    "name" : userData.name, 
                    "management" : userData.management
                }
                console.log("userId : " + userData.id, " userPassword : " + userData.password)
                if(callback) {
                    callback(data)
                }
            }
        }).catch(function (error) {
          console.log('get Error ' + error);
        });;
    }

    //세션에서 제거
    rmSessionData = (token, callback) => {
        AsyncStorage.removeItem(token).then(() => {
            if(callback){
                callback()
            }
        }).catch(function (error) {
            console.log('remove Error ' + error);
        });
    }
}