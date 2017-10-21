import React from 'react';
import {StyleSheet, Text, View, Button, Animated, Easing} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import Main from './src/navigation';

const store = configureStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}