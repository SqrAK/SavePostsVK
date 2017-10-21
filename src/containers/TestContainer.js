/**
 * Created by Alice on 30.09.2017.
 */
import Test from '../components/test';
import { connect } from 'react-redux';
import {getInfo} from '../actions/user';

const mapDispatchToProps = (dispatch) => {
    return {
        changeTest: ()=>{
            dispatch(getInfo());
        }
    }
};

function mapStateToProps(state, ownProps) {
    return {
        test: "123"
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);