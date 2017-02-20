import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_DOMAIN_REQUEST,
    DATA_RECEIVE_DOMAIN_DATA,
    ADD_DOMAIN_FAILURE,
    ADD_DOMAIN_REQUEST,
    ADD_DOMAIN_SUCCESS,
    DISPLAY_DOMAIN_FORM
} from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveDomainData(data) {
    return {
        type: DATA_RECEIVE_DOMAIN_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchDomainDataRequest() {
    return {
        type: DATA_FETCH_DOMAIN_REQUEST
    };
}

export function dataFetchDomainData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchDomainDataRequest());
        return fetch(`${SERVER_URL}/api/v1/dashboard/domain/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveDomainData(response));
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

export function addDomainSuccess() {
    return {
        type: ADD_DOMAIN_SUCCESS,
        payload: {
            statusText: 'You Have Successfully Added Domain.!!'
        }
    };
}

export function toggleDomainForm(show) {
    return {
        type: DISPLAY_DOMAIN_FORM,
        payload: {
            addDomain: !show
        }
    };
}

export function addDomainFailure(error, message) {
    return {
        type: ADD_DOMAIN_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function addDomainRequest() {
    return {
        type: ADD_DOMAIN_REQUEST
    };
}

export function addDomain(Domain,Id,token) {
    return (dispatch) => {
        dispatch(addDomainRequest());
        console.log(Id);
        return fetch(`${SERVER_URL}/api/v1/dashboard/domain/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain: Domain,
                user: Id,
                status: false
            })
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(addDomainSuccess());
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(addDomainFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(addDomainFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(addDomainFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
