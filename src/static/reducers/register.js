import {createReducer} from '../utils';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from '../constants';

const initialState = {
    isRegistering: false,
    isRegistered: false,
    isFailure: false,
    statusText: null
};

export default createReducer(initialState, {
    [REGISTER_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isRegistering: true,
            statusText: null
        });
    },
    [REGISTER_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isRegistering: false,
            isRegistered: true,
            statusText: 'You Have Successfully Registered.!!'
        });
    },
    [REGISTER_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isRegistering: false,
            isRegistered: false,
            isFailure: true,
            statusText: `Error!! ${payload.status} - ${payload.statusText}`
        });
    }
});
