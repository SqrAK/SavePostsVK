/**
 * Created by Alice on 27.09.2017.
 */
import {SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE} from '../actions/user';

const initialState =  {user: null, status:null, error:null, loading: false};

export default function (state = initialState, action) {
    switch (action.type){
        case SIGNIN_USER:
            return {...state, user: null, status:'signin', error:null, loading:true};
        case SIGNIN_USER_SUCCESS:
            return {...state, user: action.payload, status:'authenticated', error:null, loading:false};
        case SIGNIN_USER_FAILURE:
            let error = action.payload.data || {message: action.payload.message};
            return {...state, user: null, status:'signin', error: error, loading:false};
        default:
            return initialState;
    }

}