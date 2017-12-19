/**
 * Created by Alice on 27.09.2017.
 */
import {FETCH_LIKED_POSTS, FETCH_LIKED_POSTS_FAILURE, FETCH_LIKED_POSTS_SUCCESS,
        OFFSET_POSTS, FETCH_SAVED_POSTS_FAILURE, FETCH_SAVED_POSTS} from '../actions/posts';

const initialState = {
    posts: {},
    savePosts: [],
    offset: 0
};

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_LIKED_POSTS:
            return {...state, posts: action.payload, status:'fetching', error:null, loading:true};
        case FETCH_LIKED_POSTS_SUCCESS:

            return {...state, posts: action.payload.posts, offset: action.payload.offset, status:'successFetch', error:null, loading:true};
        case FETCH_LIKED_POSTS_FAILURE:
            return {...state, posts: null, status:'fail', error:action.payload, loading:true};
        case OFFSET_POSTS:
            return {...state, savePosts:action.payload};
        case FETCH_SAVED_POSTS:
            return {...state, savePosts:action.payload};
        case FETCH_SAVED_POSTS_FAILURE:
            return {...state, savePosts: []};
        default:
            return initialState;
    }
}