/**
 * Created by Alice on 27.09.2017.
 */
import React from 'react';
import {StyleSheet, Text, View, Button, Linking, WebView, AsyncStorage} from 'react-native';

import queryString from 'query-string';
// const queryString = require('query-string');

export default class SignInComponent extends React.Component {



    async setToken(token) {

        await AsyncStorage.setItem('tokenUser', token);
    }

    _onNavigationStateChange(webViewState) {
        let url = webViewState.url;
        const parsed = queryString.parse(url);
        let token = parsed["https://oauth.vk.com/blank.html#access_token"];
        if (token) {
            // this.props.setToken(token);
            this.setToken(token);
            this.props.navigation.navigate('drawerStack')
        }

    }

    render() {
        return (
            <WebView
                source={{uri: 'https://oauth.vk.com/authorize?client_id=6200644&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52&test_mode=1'}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                style={{marginTop: 20}}
            />
        );
    }
}

