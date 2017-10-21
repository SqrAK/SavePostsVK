/**
 * Created by Alice on 27.09.2017.
 */
import {GET_INGO} from '../actions/user';
const initialState = {
    test: 0
};
export default function (state = initialState, action) {
    switch (action.type){
        case GET_INGO:
            return {...state, test: action.payload};
        case 'qaz':
            return {...state, test: 10};
        default:
            return initialState;
    }

}