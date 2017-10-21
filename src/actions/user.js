/**
 * Created by Alice on 27.09.2017.
 */
import axios from 'axios';

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const GET_INGO = 'GET_INFO';
export const GET_INGO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INGO_FAILURE = 'GET_INFO_FAILURE';


export function signInUser() {
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

export function getInfo(validateEmailToken) {

    const request = axios.get(`https://oauth.vk.com/blank.html`);

    return {
        type: GET_INGO,
        payload: request
    };
}

export function getInfoSuccess(currentUser) {
    return {
        type: GET_INGO_SUCCESS,
        payload: currentUser
    };
}

export function getInfoFailure(error) {
    return {
        type: GET_INGO_FAILURE,
        payload: error
    };
}
