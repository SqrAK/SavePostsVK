/**
 * Created by Alice on 27.09.2017.
 */
import SavePostsComponent from '../components/SavePostsComponent';
import { connect } from 'react-redux';
import {fetchSavedPosts, fetchSavedPostsSuccess, fetchSavedPostsFailure} from '../actions/posts';

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: () =>{
            // dispatch(signInUser()).then((response) => {
            //     !response.error ? dispatch(signInUserSuccess(response.payload.data)) : dispatch(signInUserFail(response.payload.data));
            // });
            // dispatch(fetchPostsSuccess());
        }
    }
};

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts.posts,
        test: "123"
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePostsComponent);