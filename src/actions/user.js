/**
 * Created by Alice on 27.09.2017.
 */
import axios from 'axios';

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';

export const SET_TOKEN = 'SET_TOKEN';


export function signInUser() {
    // let res = "123234234";
    const request = axios.get(`https://oauth.vk.com/blank.html`);
    return{
        type: SIGNIN_USER,
        payload: request
    }
}
export function signInUserSuccess(user) {
    return{
        type: SIGNIN_USER_SUCCESS,
        payload: user
    }
}
export function signInUserFail(error) {
    return{
        type: SIGNIN_USER_FAILURE,
        payload: error
    }
}

export function getToken() {

    const request = "";

    return {
        type: GET_TOKEN,
        payload: request
    };
}

export function getTokenSuccess(currentUser) {
    return {
        type: GET_TOKEN_SUCCESS,
        payload: currentUser
    };
}

export function getTokenFailure(error) {
    return {
        type: GET_TOKEN_FAILURE,
        payload: error
    };
}

export function setToken(token) {
    return{
        type: SET_TOKEN,
        payload: token
    }
}

