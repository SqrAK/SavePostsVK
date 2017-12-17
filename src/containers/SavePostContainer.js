/**
 * Created by Alice on 27.09.2017.
 */
import SavePostsComponent from '../components/SavePostsComponent';
import { connect } from 'react-redux';
import {fetchSavedPosts} from '../actions/posts';

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.savePosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSavePosts: (posts) =>{
            dispatch(fetchSavedPosts(posts));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SavePostsComponent);