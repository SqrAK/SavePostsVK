/**
 * Created by Alice on 11.10.2017.
 */
import React from 'react';
import {StyleSheet, Text, View, Button, TouchableHighlight, ScrollView, Image, Modal} from 'react-native';
import {AsyncStorage} from 'react-native';
import Dimensions from 'Dimensions';
import {FileSystem} from 'expo';


export default class SavePostsComponent extends React.Component {

    async getPostsWithToken(offset, count) {
        await AsyncStorage.getItem('tokenUser').then((value) => {
            this.props.getPosts(value, offset, count);
        });
    }

    async getUserId() {
        await AsyncStorage.getItem('user_id').then((value) => {
            this.userID = value;
            this.getPostsWithToken(0, 50);
        });
    }

    componentWillMount() {
        this.getUserId();
    }

    _onPressButton() {
        //console.log("touchableHiglightImage");
    }

    asyncDownload(url, path) {
        FileSystem.getInfoAsync(path).then((responce) => {
            if (!responce.exists) {
                FileSystem.downloadAsync(
                    url, path
                )
                    .then(({uri}) => {
                        console.log('Finished downloading to ', uri);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });

    }

    downloadImgIfNeed(imgUrl, nameFile) {
        const imgSaveUrl = FileSystem.documentDirectory + this.userID + "/img";
        FileSystem.getInfoAsync(`${imgSaveUrl}/${nameFile}.jpg`).then((responce) => {
            if (responce.exists && !responce.isDirectory) {
                return;
            }
        });
        FileSystem.getInfoAsync(imgSaveUrl).then((responce) => {

            if (responce.exists && responce.isDirectory) {
                FileSystem.getInfoAsync(imgSaveUrl).then((responce) => {

                    if (responce.exists && responce.isDirectory) {

                        this.asyncDownload(imgUrl, `${imgSaveUrl}/${nameFile}.jpg`);


                    } else {
                        FileSystem.makeDirectoryAsync(imgSaveUrl).then(() => {

                            this.asyncDownload(imgUrl, `${imgSaveUrl}/${nameFile}.jpg`);

                        });
                    }
                });

            } else {
                FileSystem.makeDirectoryAsync(imgSaveUrl).then(() => {
                    FileSystem.makeDirectoryAsync(imgSaveUrl).then(() => {

                        this.asyncDownload(imgUrl, `${imgSaveUrl}/${nameFile}.jpg`);

                    });
                });
            }
        });
    }

    asyncWrite(path, contents) {
        FileSystem.writeAsStringAsync(
            path, contents
        ).then(
            () => {
                console.log("good");
            }
        ).catch(
            () => {
                console.log("bad");
            }
        );
    }

    writeToFile(filename, contents) {
        const postsUrl = FileSystem.documentDirectory + this.userID;
        FileSystem.getInfoAsync(postsUrl).then((responce) => {

            if (responce.exists && responce.isDirectory) {
                FileSystem.getInfoAsync(postsUrl + "/posts").then((responce) => {

                    if (responce.exists && responce.isDirectory) {
                        this.asyncWrite(`${postsUrl}/posts/${filename}.txt`, contents);
                    } else {
                        FileSystem.makeDirectoryAsync(postsUrl + "/posts").then(() => {
                            this.asyncWrite(`${postsUrl}/posts/${filename}.txt`, contents);
                        });
                    }
                });

            } else {
                FileSystem.makeDirectoryAsync(postsUrl).then(() => {
                    FileSystem.makeDirectoryAsync(postsUrl + "/posts").then(() => {
                        this.asyncWrite(`${postsUrl}/posts/${filename}.txt`, contents);
                    });

                });
            }
        });

    }

    _onPressButtonSave(post) {

        if (post.hasOwnProperty("attachments"))
            post.attachments.map((item, index) => {
                switch (item.type) {
                    case "photo":
                        item.photo.photo_604 = FileSystem.documentDirectory + this.userID + "/img/" + item.photo.id + ".jpg";
                        break;
                }
            });

        let content = JSON.stringify(post);

        this.writeToFile(post.from_id + "_" + post.id, content);
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

                    if (this.userID) {
                        this.downloadImgIfNeed(item.photo.photo_604, item.photo.id);
                        item.photo.photo_604 = FileSystem.documentDirectory + this.userID + "/img/" + item.photo.id + ".jpg";
                    }

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
                        <View key={index} style={styles.videoWrap}>
                            <Image
                                style={styles.video}
                                source={{uri: item.video.first_frame_320}}
                            />
                        </View>
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

    renderAllPosts(posts) {
        return posts.map((post, index) => {

            return (
                <View key={index} style={styles.post}>
                    <Text>
                        {post.text}
                    </Text>

                    {this.renderAttachmentsIfNeed(post)}
                    {this.renderHistoryIfNeed(post)}

                    <TouchableHighlight onPress={() => {this._onPressButtonSave(post)}}>
                        <Text style={styles.button}>Save</Text>
                    </TouchableHighlight>
                </View>

            );
        });
    }

    renderButtonLoadIfNeed(posts, offset) {

        if (posts.count > 50) {
            if (offset+50 < posts.count && offset!=0) {
                return (
                    <View style={styles.wrapBtnPage }>
                        <Button
                            style={styles.btnPage}
                            onPress={() => {this.getPostsWithToken(offset-50, 50, posts);}}
                            title="Prev page"
                        />
                        <Button
                            style={styles.btnPage}
                            onPress={() => {this.getPostsWithToken(offset+50, 50, posts);}}
                            title="Next page"
                        />
                    </View>
                )
            }
            else{
                if(offset==0){
                    return (
                        <View>
                            <Button
                                onPress={() => {this.getPostsWithToken(offset+50, 50, posts);}}
                                title="Next page"
                            />
                        </View>
                    )
                }
                if(offset+50 > posts.count){
                    return (
                        <View>
                            <Button
                                onPress={() => {this.getPostsWithToken(offset-50, 50, posts);}}
                                title="Prev page"
                            />
                        </View>
                    )
                }
            }
        }
    }

    render() {
        const {posts, offset} = this.props;
        if (posts.count) {
            return (
                <ScrollView
                    ref={(view) => this._scrollView = view}
                >
                    {this.renderAllPosts(posts.items)}
                    {this.renderButtonLoadIfNeed(posts, offset)}
                </ScrollView>
            );
        }
        return (
            <View style={styles.load}>
                <Text>...Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    load: {
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
    scrollcont: {
        backgroundColor: '#ffffff',
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
    wrapBtnPage:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    btnPage:{

    },
    imgWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent: 'space-around'
    },
    video: {
        height: 200,
        width: 320
    },
    videoWrap: {},
    oneImgWrap: {},
    img: {
        width: Dimensions.get('window').width / 2 - 10,
        minHeight: 150,
        maxHeight: 500,

    }
});
