import axios from 'axios';
import {
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