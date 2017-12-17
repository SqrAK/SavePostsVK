/**
 * Created by Alice on 27.09.2017.
 */
import SignInComponent from '../components/SignInComponent';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import {onlineUser, signInUserFail, signInUserSuccess, setToken} from '../actions/user';

const mapDispatchToProps = (dispatch) => {
    return {
        setIsConn: (isConnected) =>{
            dispatch(onlineUser(isConnected));
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        token: state.user.token,
        isConnected: state.user.isConnected
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);