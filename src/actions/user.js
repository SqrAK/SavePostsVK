/**
 * Created by Alice on 27.09.2017.
 */
import axios from 'axios';

export const ONLINE_USER = 'ONLINE_USER';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';

export const SET_TOKEN = 'SET_TOKEN';


export function onlineUser(isOnline) {

    return{
        type: ONLINE_USER,
        payload: isOnline
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

