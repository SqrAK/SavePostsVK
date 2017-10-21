/**
 * Created by Alice on 27.09.2017.
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SavePostsComponent extends React.Component {

    renderPost(title) {
        return (
            <View style = {styles.post}>
                <Text>Post.Header</Text>
                <Text>Post.Info</Text>
                <Text>{title}</Text>
            </View>
        );
    }

    render() {
        const {posts, test} = this.props;
        return (
            <View style={styles.container}>
                <Text>SavePostsComponent component</Text>
                {this.renderPost(123)}
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
    post:{

    }
});
