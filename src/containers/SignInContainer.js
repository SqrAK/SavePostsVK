/**
 * Created by Alice on 27.09.2017.
 */
import SignInComponent from '../components/SignInComponent';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import {signInUser, signInUserFail, signInUserSuccess, setToken} from '../actions/user';

const mapDispatchToProps = (dispatch) => {
    return {

        signin1: () =>{
            // dispatch(signInUser()).then((response) => {
            //     !response.error ? dispatch(signInUserSuccess(response.payload.data)) : dispatch(signInUserFail(response.payload.data));
            // });
            // dispatch(signInUserSuccess());
        },
        setToken: (token) =>{

            // dispatch(setToken(token));
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        // user: state.user.user
        token: state.user.token
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);