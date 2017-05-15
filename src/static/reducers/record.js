import { createReducer } from '../utils';
import { DATA_FETCH_DNS_RECORD_REQUEST,
    DATA_RECEIVE_DNS_RECORD_DATA,
    ADD_DNS_RECORD_FAILURE,
    ADD_DNS_RECORD_REQUEST,
    ADD_DNS_RECORD_SUCCESS,
    UPDATE_DNS_RECORD_FAILURE,
    UPDATE_DNS_RECORD_REQUEST,
    UPDATE_DNS_RECORD_SUCCESS,
    DISPLAY_DNS_RECORD_FORM
} from '../constants';

const initialState = {
    records: [],
    fetched: false,
    isAdding: false,
    isAdded: false,
    isFailure: false,
    statusText: null,
    addRecord: false
};

export default createReducer(initialState, {
    [DATA_RECEIVE_DNS_RECORD_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            records: payload.data,
            fetched: true,
            statusText: 'Received Records'
        });
    },
    [DATA_FETCH_DNS_RECORD_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            fetched: false
        });
    },
    [ADD_DNS_RECORD_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: true,
            statusText: null
        });
    },
    [ADD_DNS_RECORD_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: true,
            addRecord: false,
            statusText: 'You Have Successfully Added DNS Record.!!'
        });
    },
    [ADD_DNS_RECORD_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: false,
            isFailure: true,
            statusText: `Error!! ${payload.status} - ${payload.statusText}`
        });
    },
    [DISPLAY_DNS_RECORD_FORM]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: false,
            isFailure: false,
            statusText: null,
            addRecord: !state.addRecord
        });
    },
    [UPDATE_DNS_RECORD_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: true,
            statusText: null
        });
    },
    [UPDATE_DNS_RECORD_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: true,
            addRecord: false,
            statusText: 'You Have Successfully Added DNS Record.!!'
        });
    },
    [UPDATE_DNS_RECORD_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAdding: false,
            isAdded: false,
            isFailure: true,
            statusText: `Error!! ${payload.status} - ${payload.statusText}`
        });
    },

});
