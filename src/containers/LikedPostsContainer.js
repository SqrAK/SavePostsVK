/**
 * Created by Alice on 11.10.2017.
 */
/**
 * Created by Alice on 27.09.2017.
 */
import LikedPostsComponent from '../components/LikedPostsComponent';
import { connect } from 'react-redux';
import {fetchLikedPosts, fetchLikedPostsFailure, fetchLikedPostsSuccess} from '../actions/posts';

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (token) =>{
            let response = dispatch(fetchLikedPosts(token));
           if (response.length != 0){
                response.payload.then(
                    (response) =>{
                        dispatch(fetchLikedPostsSuccess(response))
                    });
            }


        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(LikedPostsComponent);