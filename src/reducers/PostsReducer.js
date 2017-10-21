/**
 * Created by Alice on 27.09.2017.
 */
import {FETCH_LIKED_POSTS, FETCH_LIKED_POSTS_FAILURE, FETCH_LIKED_POSTS_SUCCESS,
        FETCH_SAVED_POSTS, FETCH_SAVED_POSTS_FAILURE, FETCH_SAVED_POSTS_SUCCESS} from '../actions/posts';

const initialState = {
    posts: [
        {
            title:"qwety"
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_LIKED_POSTS:
            return {...state, posts: []};
        case FETCH_LIKED_POSTS_SUCCESS:
            return {...state, posts:action.payload};
        case FETCH_LIKED_POSTS_FAILURE:
            return {...state, posts: []};
        case FETCH_SAVED_POSTS:
            return {...state, posts: []};
        case FETCH_SAVED_POSTS_SUCCESS:
            return {...state, posts:action.payload};
        case FETCH_SAVED_POSTS_FAILURE:
            return {...state, posts: []};
        default:
            return initialState;
    }
}