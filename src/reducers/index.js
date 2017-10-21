/**
 * Created by Alice on 27.09.2017.
 */
import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PostReducer from './PostsReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    posts: PostReducer
});

export default rootReducer;