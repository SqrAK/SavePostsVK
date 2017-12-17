/**
 * Created by Alice on 27.09.2017.
 */
import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, Image, Modal, AsyncStorage} from 'react-native';
import {FileSystem} from 'expo';
import Dimensions from 'Dimensions';


export default class SavePostsComponent extends React.Component {

    async getUserIdAndLoadPosts() {
        await AsyncStorage.getItem('user_id').then((value) => {
            this.userID = value;
            this.getAllFiles();
        });
    }

    componentWillMount() {
        this.getUserIdAndLoadPosts();
    }

    getAllFiles() {
        const filePostsUrl = FileSystem.documentDirectory + `${this.userID}/posts`;
        //check exist directory
        FileSystem.getInfoAsync(filePostsUrl).then((responce) => {
            if (responce.exists && responce.isDirectory) {
                //gel all file in directory
                FileSystem.readDirectoryAsync(filePostsUrl).then((files) => {
                    let posts = [];
                    for (let i = 0; i < files.length; i++) {
                        FileSystem.readAsStringAsync(filePostsUrl + '/' + files[i]).then((post) => {

                            posts.push(JSON.parse(post));
                            if(i==files.length-1)
                                this.props.getSavePosts(posts);
                        });
                    }
                });

            }
        });
    }

    deleteFile(filename) {
        const filePostUrl = FileSystem.documentDirectory + this.userID+ '/posts/' + filename + '.txt';
        FileSystem.getInfoAsync(filePostUrl).then((responce) => {
            if (responce.exists && !responce.isDirectory) {
                FileSystem.deleteAsync(filePostUrl).then(
                    () => {
                        console.log("good delete");
                        this.getAllFiles();
                    }
                ).catch(
                    () => {
                        console.log("bad delete");
                    }
                );
            }else {
                console.log("don't have file");
            }
        });

    }

    _onPressButtonDelete(post) {
        this.deleteFile(post.from_id + "_" + post.id);
    }

    renderHistory(post) {

        return post.copy_history.map((story, index) => {
            return (
                <View key={index}>
                    <Text style={styles.textPost}>
                        {story.text}
                    </Text>
                    {this.renderAttachmentsIfNeed(story)}
                </View>
            );
        });
    }

    renderHistoryIfNeed(post) {
        if (!post.hasOwnProperty("copy_history")) {
            return
        }
        return this.renderHistory(post);
    }


    renderAttachments(attachements) {

        return attachements.map((item, index) => {
            switch (item.type) {
                case "photo":
                    // console.log(item.photo.width, item.photo.height);
                    return (
                        <TouchableHighlight key={index} onPress={this._onPressButton} style={styles.oneImgWrap}>
                            <Image
                                style={{width:Dimensions.get('window').width - 50, height: (Dimensions.get('window').width -50)*item.photo.height/item.photo.width}}
                                source={{uri: item.photo.photo_604}}
                            />
                        </TouchableHighlight>
                    );
                    break;
                case "video":
                    return (
                        <Image
                            key={index}
                            style={{width: 320, height:200}}
                            source={{uri: item.video.first_frame_320}}
                        />
                    );
                    break;
            }
        });
    }

    renderAttachmentsIfNeed(post) {
        if (!post.hasOwnProperty("attachments")) {
            return
        }
        return (
            <View style={styles.imgWrap}>
                {this.renderAttachments(post.attachments)}
            </View>
        );
    }

    renderPosts(posts) {
        return posts.map((post, index) => {

            return (
                <View key={index} style={styles.post}>
                    <Text>
                        {post.text}
                    </Text>

                    {this.renderAttachmentsIfNeed(post)}
                    {this.renderHistoryIfNeed(post)}

                    <TouchableHighlight onPress={() => {this._onPressButtonDelete(post)}}>
                        <Text style={styles.button}>Delete</Text>
                    </TouchableHighlight>
                </View>

            );
        });
    }


    render() {
        const {posts} = this.props;
        if (posts.length != 0) {
            return (
                <ScrollView>
                    {this.renderPosts(posts)}
                </ScrollView>
            );
        }
        return (
            <View style={styles.nothing}>
                <Text>Nothing to show</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nothing: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#fff',
    },
    post: {
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 10,
    },
    textPost: {
        padding: 10,
    },
    button: {
        color: '#ff0000'
    },
    imgWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent: 'space-around'
    },
    oneImgWrap: {},
    img: {
        width: Dimensions.get('window').width / 2 - 10,
        minHeight: 150,
        maxHeight: 500,

    }
});
