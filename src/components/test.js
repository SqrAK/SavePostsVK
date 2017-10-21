import React, { Component } from 'react';
import { View, StyleSheet, Button, Linking, Text } from 'react-native';
import { Constants } from 'expo';
import axios from 'axios';

export default class App extends Component {


    getInfo(){
        const req =axios.get(`https://oauth.vk.com/blank.html`);
        return(
            <Text>{req.responce}</Text>
        )
        // this.props.test = {
        //     response: "qwe"
        // };
        // this.props = {
        //     test: "dfsdf"
        // };
    }

    render() {


        return (
            <View style={styles.container}>
                <Button title="Click me" onPress={ ()=>{ Linking.openURL('https://oauth.vk.com/authorize?client_id=6200644&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52')}} />
                {this.getInfo()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
});