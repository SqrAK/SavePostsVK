/**
 * Created by Alice on 18.10.2017.
 */
import React from 'react';
import {StyleSheet, Text, View, Button, Animated, Easing} from 'react-native';
import SignIn from './containers/SignInContainer';
import SavePosts from './containers/SavePostContainer';
import LikedPosts from './containers/LikedPostsContainer';
import {DrawerNavigator, StackNavigator, NavigationActions} from "react-navigation";


class DrawerContainer extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>

                <Text
                    onPress={() => navigation.navigate('screen2')}
                    style={styles.menuItem}>
                    LikedPosts
                </Text>
                <Text
                    onPress={() => navigation.navigate('screen1')}
                    style={styles.menuItem}>
                    SavedPosts
                </Text>
                <Text
                    onPress={() => {
                        const actionToDispatch = NavigationActions.reset({
                            index: 0,
                            key: null,
                            actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
                        });
                        this.props.navigation.dispatch(actionToDispatch)
                    }}
                    style={[styles.menuItem, styles.borderText]}>
                    Log Out
                </Text>
            </View>
        )
    }
}


const DrawerStack = DrawerNavigator({
    screen2: {screen: LikedPosts},
    screen1: {screen: SavePosts},
}, {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
});


const drawerButton = (navigation) =>
    <Text
        style={{padding: 5, color: 'white'}}
        onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }>Menu</Text>;


const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerStack}
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#507299'},
        title: 'Welcome!',
        headerTintColor: 'white',
        gesturesEnabled: false,
        headerLeft: drawerButton(navigation)
    })
});


const LoginStack = StackNavigator({
    loginScreen: {screen: SignIn}
}, {
    headerMode: 'float',
    navigationOptions: {
        headerStyle: {backgroundColor: '#ffffff'},
        title: 'Войдите',
        headerTintColor: '#000000'
    }
});


const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
});


export default PrimaryNav = StackNavigator({
    loginStack: {screen: LoginStack},
    drawerStack: {screen: DrawerNavigation}
}, {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    menuItem: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#285473',
        padding: 10,
        margin: 10,
        textAlign: 'left'
    },
    borderText: {
        borderTopWidth: 0.3,
        borderTopColor: '#285473'
    }
});
