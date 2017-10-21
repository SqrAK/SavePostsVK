/**
 * Created by Alice on 27.09.2017.
 */
import SignInComponent from '../components/SignInComponent';
import { connect } from 'react-redux';
import {signInUser, signInUserFail, signInUserSuccess} from '../actions/user';

const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () =>{
            //sign up is not reused, so we dont need to resetUserFields
            //in our case, it will remove authenticated users
            //dispatch(resetUserFields());
        },
        signin: () =>{
            dispatch(signInUser()).then((response) => {
                !response.error ? dispatch(signInUserSuccess(response.payload.data)) : dispatch(signInUserFail(response.payload.data));
            });
            // dispatch(signInUserSuccess());
        },
        fetchMarks: () => {
            dispatch(signInUser()).then((response) => {
                !response.error ? dispatch(signInUserSuccess(response.payload.data)) : dispatch(signInUserFail(response.payload.data));
            });
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.user
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);