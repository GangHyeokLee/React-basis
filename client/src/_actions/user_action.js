import axios from 'axios';
import {
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER
} from './types.js';

export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => {
            console.log(response);
            return response.data;
        })
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => {
            console.log(response);
            return response.data;
        })
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => {
            console.log(response.data);
            return response.data;
        })
    return {
        type: AUTH_USER,
        payload: request
    }
}