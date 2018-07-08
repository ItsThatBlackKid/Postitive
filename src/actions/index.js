import * as actionType from './types';

export const setToken = (data, fromSession) => {
     if(!fromSession) sessionStorage.setItem('token', data); // update sessionStorage if data isn't coming from the session
    return {
        type: actionType.SET_TOKEN,
        data
    }
};

export const setUser = (data, fromSession) => {
   if(!fromSession) sessionStorage.setItem('user', data);
    return {
        type: actionType.SET_USER,
        data
    }
};