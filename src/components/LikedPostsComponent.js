/**
 * Created by Alice on 11.10.2017.
 */
import React from 'react';
import {StyleSheet, Text, View, Button, TouchableHighlight, ScrollView, Image, Modal} from 'react-native';
import {AsyncStorage} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import Dimensions from 'Dimensions';

export default class SavePostsComponent extends React.Component {

    async getPostsWithToken() {
        await AsyncStorage.getItem('tokenUser').then((value) => {
            this.props.getPosts(value);
        });
    }

    componentWillMount() {
        this.getPostsWithToken();
    }

    _onPressButton() {
        console.log("touchableHiglight");
    }
    _onPressButtonSave() {
        console.log("touchableHiglightSave");
    }

    renderHistory(post) {

        return post.copy_history.map((story, index) => {
            return (
                <View key={index}>
                    <Text style={styles.textPost}>
                        {story.text}
                    </Text>
                    {this.checkAttachments(story)}
                </View>
            );
        });
    }

    checkHistory(post) {
        if (!post.hasOwnProperty("copy_history")) {
            return
        }
        return this.renderHistory(post);
    }


    renderAttachments(attachements) {
        let imgArr = [];

        return attachements.map((item, index) => {
            if (item.type == "photo") {
                imgArr.push({url: item.photo.photo_604});
                // console.log(item.photo.width, item.photo.height);
                return (
                    <TouchableHighlight key={index} onPress={this._onPressButton} style={styles.oneImgWrap}>
                        <Image
                            style={styles.img}
                            source={{uri: item.photo.photo_604}}
                        />
                    </TouchableHighlight>
                );
            }
        });
    }

    checkAttachments(post) {
        if (!post.hasOwnProperty("attachments")) {
            return
        }
        return (
            <View style={styles.imgWrap}>
                {this.renderAttachments(post.attachments)}
            </View>
        );
    }

    renderAllPosts(posts) {
        return posts.map((post, index) => {

            return (
                <View key={index} style={styles.post}>
                    <Text>
                        {post.text}
                    </Text>

                    {this.checkAttachments(post)}
                    {this.checkHistory(post)}

                    <TouchableHighlight onPress={this._onPressButtonSave}>
                        <Text style={styles.button}>Save</Text>
                    </TouchableHighlight>
                </View>

            );
        });
    }

    render() {
        const {posts} = this.props;
        if (posts.count) {
            return (
                <ScrollView>
                    {this.renderAllPosts(posts.items)}
                </ScrollView>
            );
        }
        return (
            <View style={styles.container}>
                <Text>...Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollcont: {
        backgroundColor: '#ffffff',
    },
    post: {
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 10,
    },
    textPost:{
        padding:10,
    },
    button: {
        color: '#ff0000'
    },
    imgWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap:'wrap',
        alignContent: 'space-around'
    },
    oneImgWrap:{

    },
    img: {
        width:Dimensions.get('window').width/2-10,
        minHeight:150,
        maxHeight:500,

    }
});
