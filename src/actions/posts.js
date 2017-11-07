/**
 * Created by Alice on 27.09.2017.
 */
export const FETCH_LIKED_POSTS = 'FETCH_LIKED_POSTS';
export const FETCH_LIKED_POSTS_SUCCESS = 'FETCH_LIKED_POSTS_SUCCESS';
export const FETCH_LIKED_POSTS_FAILURE = 'FETCH_LIKED_POSTS_FAILURE';

export const FETCH_SAVED_POSTS = 'FETCH_SAVED_POSTS';
export const FETCH_SAVED_POSTS_SUCCESS = 'FETCH_SAVED_POSTS_SUCCESS';
export const FETCH_SAVED_POSTS_FAILURE = 'FETCH_SAVED_POSTS_FAILURE';


export function fetchLikedPosts(token) {

    return {
        type:FETCH_LIKED_POSTS,
        payload: 123
    }
}

export function fetchLikedPostsSuccess() {
    return {
        type: FETCH_LIKED_POSTS_SUCCESS,
        payload: 321
    }
}

export function fetchLikedPostsFailure() {
    return {
        type: FETCH_LIKED_POSTS_FAILURE,
        payload: 987
    }
}

export function fetchSavedPosts() {
    return {
        type:FETCH_LIKED_POSTS,
        payload: 123
    }
}

export function fetchSavedPostsSuccess() {
    return {
        type: FETCH_LIKED_POSTS_SUCCESS,
        payload: 321
    }
}

export function fetchSavedPostsFailure() {
    return {
        type: FETCH_LIKED_POSTS_FAILURE,
        payload: 987
    }
}