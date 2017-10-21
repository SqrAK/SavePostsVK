/**
 * Created by Alice on 11.10.2017.
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SavePostsComponent extends React.Component {

    render() {
        const {posts, test} = this.props;
        return (
            <View style={styles.container}>
                <Text>LikedPostsComponent component</Text>
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
