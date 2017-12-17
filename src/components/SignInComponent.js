/**
 * Created by Alice on 27.09.2017.
 */
import React from 'react';
import {StyleSheet, Text, View, Button, Linking, WebView, AsyncStorage, NetInfo} from 'react-native';
import queryString from 'query-string';

// NetInfo.getConnectionInfo().then((connectionInfo) => {
//     console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
// });
// function handleFirstConnectivityChange(connectionInfo) {
//     console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
//     NetInfo.removeEventListener(
//         'connectionChange',
//         handleFirstConnectivityChange
//     );
// }
// NetInfo.addEventListener(
//     'connectionChange',
//     handleFirstConnectivityChange
// );

export default class SignInComponent extends React.Component {


    componentDidMount() {

        NetInfo.isConnected.fetch().then(isConnected => {
            this.props.setIsConn(isConnected);
        });
        function handleFirstConnectivityChange(isConnected) {
            NetInfo.isConnected.removeEventListener(
                'change',
                handleFirstConnectivityChange
            );
        }
        NetInfo.isConnected.addEventListener(
            'change',
            handleFirstConnectivityChange
        );

    }


    async setTokenAndId(token, id) {

        await AsyncStorage.setItem('tokenUser', token);
        await AsyncStorage.setItem('user_id', id);
    }

    _onNavigationStateChange(webViewState) {
        let url = webViewState.url;
        const parsed = queryString.parse(url);
        let token = parsed["https://oauth.vk.com/blank.html#access_token"];
        let id = parsed["user_id"];
        if (token) {
            this.setTokenAndId(token, id);
            this.props.navigation.navigate('drawerStack')
        }

    }



    render() {
        let isConnected = this.props.isConnected;
        if(isConnected){
            return (
                <WebView
                    source={{uri: 'https://oauth.vk.com/authorize?client_id=6200644&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52&revoke=1'}}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    style={{marginTop: 20}}
                />
            );
        }else{
            return (
              <View>
                  <Text>
                      интернета нет
                  </Text>
              </View>
            );
        }

    }
}

