/**
 * Created by Alice on 11.10.2017.
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

export default class SavePostsComponent extends React.Component {

    async getToken () {
        await AsyncStorage.getItem('tokenUser').then((value) => {
            console.log(value);


        });
    }

    componentWillMount() {
        this.getToken();
    }

render() {
        const {posts, test} = this.props;
        this.getToken();
        return (
            <View style={styles.container}>
                <Text>LikedPostsComponent component</Text>
                <Text>{}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
