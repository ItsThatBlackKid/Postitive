import axios from 'axios'
import store from '../store'

export const authClient = function() {
    const token = store.getState().token;
    const params = {
        baseURL: '/',
        headers: {'Authorization': 'Token' + token}
    };
    return axios.create(params)
};

export const regClient = function () {
  const params = {
      baseURL: '/'
  };

  return axios.create(params)
};