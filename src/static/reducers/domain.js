import { createReducer } from '../utils';
import { DATA_FETCH_DOMAIN_REQUEST,
    DATA_RECEIVE_DOMAIN_DATA,
    ADD_DOMAIN_FAILURE,
    ADD_DOMAIN_REQUEST,
    ADD_DOMAIN_SUCCESS,
    DISPLAY_DOMAIN_FORM
} from '../constants';

const initialState = {
    domains: [],
    isFetching: false,
    isAdding: false,
    isAdded: false,
    isFailure: false,
    statusText: null,
    addDomain: false
};

export default createReducer(initialState, {
    [DATA_RECEIVE_DOMAIN_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            domains: payload.data,
            isFetching: false
        });
    },
    [DATA_FETCH_DOMAIN_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [ADD_DOMAIN_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: true,
            statusText: null
        });
    },
    [ADD_DOMAIN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: true,
            addDomain: false,
            statusText: 'You Have Successfully Added Domain.!!'
        });
    },
    [ADD_DOMAIN_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: false,
            isFailure: true,
            statusText: `Error!! ${payload.status} - ${payload.statusText}`
        });
    },
    [DISPLAY_DOMAIN_FORM]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: false,
            isFailure: false,
            statusText: null,
            addDomain: !state.addDomain
        });
    },
});
