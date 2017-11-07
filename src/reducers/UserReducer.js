/**
 * Created by Alice on 27.09.2017.
 */
import {SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, SET_TOKEN} from '../actions/user';

// const initialState =  {user: null, status:null, error:null, loading: false};
const initialState =  {token: ""};

export default function (state = initialState, action) {
    switch (action.type){
        case SET_TOKEN:
            return {...state, token: action.payload};
        // case SIGNIN_USER_SUCCESS:
        //     return {...state, req: action.payload};
        // case SIGNIN_USER_FAILURE:
        //     return {...state, req: action.payload};
        // case SIGNIN_USER:
        //     return {...state, user: null, status:'signin', error:null, loading:true};
        // case SIGNIN_USER_SUCCESS:
        //     return {...state, user: action.payload, status:'authenticated', error:null, loading:false};
        // case SIGNIN_USER_FAILURE:
        //     let error = action.payload.data || {message: action.payload.message};
        //     return {...state, user: null, status:'signin', error: error, loading:false};
        default:
            return initialState;
    }

}