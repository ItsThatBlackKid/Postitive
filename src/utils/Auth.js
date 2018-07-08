import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import {setToken, setUser} from "../actions";
import {LOGIN, ACCOUNTS} from '../config/Api';
import {regClient} from "./ApiClient";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}


export function login(username, password) {
    return  regClient().post(
        LOGIN, {
            username,
            password
        })
        .then(function (response) {
            store.dispatch(setToken(response.data.token));
            store.dispatch(setUser(username));
        }).catch( function (error) {
            //raise different exception if due to invalid credentials
            if(_.get(error, 'response.status') === 400) {
                throw new InvalidCredentialsException(error)
            }
            throw error;
        });
}

export function register(username, email, password){
    return regClient().post(
        ACCOUNTS, {
            "username": username,
            "email": email,
            "password": password,
        }
    ).catch((error) => {
        console.log(error)
    })
}

export function isLoggedIn() {
    return store.getState().token != null;
}