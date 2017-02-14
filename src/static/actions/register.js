import fetch from 'isomorphic-fetch';
import {push} from 'react-router-redux';
import {SERVER_URL} from '../utils/config';
import {checkHttpStatus, parseJSON} from '../utils';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from '../constants';

export function registerUserSuccess() {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            statusText: 'You Have Successfully Registered.!!'
        }
    };
}

export function registerUserFailure(error, message) {
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST
    };
}

export function registerUser(userName, firstName, lastName, Email, pwrd, redirect = '/login') {
    return (dispatch) => {
        dispatch(registerUserRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: Email,
                username: userName,
                first_name: firstName,
                last_name: lastName,
                password: pwrd
            })
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(registerUserSuccess());
                dispatch(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(registerUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(registerUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(registerUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
