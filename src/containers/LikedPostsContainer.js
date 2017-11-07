/**
 * Created by Alice on 11.10.2017.
 */
/**
 * Created by Alice on 27.09.2017.
 */
import LikedPostsComponent from '../components/LikedPostsComponent';
import { connect } from 'react-redux';
import {fetchLikedPosts, fetchLikedPostsFailure, fetchLikedPostsSuccess} from '../actions/posts';

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () =>{
            dispatch(fetchLikedPosts(token));
        }
    }
};

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts.posts,
        test: "123"
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedPostsComponent);