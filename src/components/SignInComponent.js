/**
 * Created by Alice on 27.09.2017.
 */
import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';

export default class SignInComponent extends React.Component {

    render() {
        const {user} = this.props;
        return (
            <View style={styles.container}>
                <Text>SignIn component</Text>
                <Text>{user}</Text>
                <Button
                    title="Вход"
                    onPress={ ()=>{ Linking.openURL('https://oauth.vk.com/authorize?client_id=6200644&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52')}}
                />
                <Button
                    title="Сделаем вид, что вошли"
                    onPress={() => this.props.navigation.navigate('drawerStack')}
                />
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
