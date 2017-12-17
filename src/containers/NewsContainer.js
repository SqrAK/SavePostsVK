/**
 * Created by Alice on 11.10.2017.
 */
/**
 * Created by Alice on 27.09.2017.
 */
import LikedPostsComponent from '../components/LikedPostsComponent';
import { connect } from 'react-redux';
import {fetchNewsPosts, fetchNewsPostsSuccess, offsetPosts} from '../actions/posts';

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.posts,
        offset: state.posts.offset
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNewsPosts: (token, offset, count) =>{
            let response = dispatch(fetchNewsPosts(token, offset, count));
            if (response.length != 0){
                response.payload.then(
                    (response) =>{
                        dispatch(fetchNewsPostsSuccess(response, offset))
                    });
            }
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(LikedPostsComponent);