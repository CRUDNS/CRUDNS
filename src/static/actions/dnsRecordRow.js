import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
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
import { authLoginUserFailure } from './auth';


export function dataReceiveDnsRecordData(data) {
    return {
        type: DATA_RECEIVE_DNS_RECORD_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchDnsRecordDataRequest() {
    return {
        type: DATA_FETCH_DNS_RECORD_REQUEST
    };
}

export function dataFetchDnsRecordData(token, domain) {
    return (dispatch, state) => {
        dispatch(dataFetchDnsRecordDataRequest());
        return fetch(`${SERVER_URL}/api/v1/dashboard/records/${domain}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveDnsRecordData(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                        dispatch(push('/login'));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function addDnsRecordSuccess() {
    return {
        type: ADD_DNS_RECORD_SUCCESS,
        payload: {
            statusText: 'You Have Successfully Added DnsRecord.!!'
        }
    };
}

export function toggleDnsRecordForm(show) {
    return {
        type: DISPLAY_DNS_RECORD_FORM,
        payload: {
            addRecord: !show
        }
    };
}

export function addDnsRecordFailure(error, message) {
    return {
        type: ADD_DNS_RECORD_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function addDnsRecordRequest() {
    return {
        type: ADD_DNS_RECORD_REQUEST
    };
}

export function addDnsRecord(DnsRecord, token) {
    return (dispatch) => {
        dispatch(addDnsRecordRequest());
        return fetch(`${SERVER_URL}/api/v1/dashboard/dns/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DnsRecord)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(addDnsRecordSuccess());
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(addDnsRecordFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(addDnsRecordFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(addDnsRecordFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function updateDnsRecordSuccess() {
    return {
        type: UPDATE_DNS_RECORD_SUCCESS,
        payload: {
            statusText: 'You Have Successfully Updated DnsRecord.!!'
        }
    };
}

export function updateDnsRecordFailure(error, message) {
    return {
        type: UPDATE_DNS_RECORD_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function updateDnsRecordRequest() {
    return {
        type: UPDATE_DNS_RECORD_REQUEST
    };
}

export function updateDnsRecord(DnsRecord, token) {
    return (dispatch) => {
        dispatch(addDnsRecordRequest());
        return fetch(`${SERVER_URL}/api/v1/dashboard/dns/${DnsRecord.id}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DnsRecord)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(updateDnsRecordSuccess());
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(updateDnsRecordFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(updateDnsRecordFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(updateDnsRecordFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
