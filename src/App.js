import React, {Component, Fragment} from 'react';
import Posts from "./components/posts"
import Messages from "./components/messages"
import PersistAppBar from "./components/custom-appbar"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './static/css/App.css';
import './utils/ApiClient'
import Provider from "react-redux/es/components/Provider";
import store from "./store"
import {setToken, setUser} from "./actions";
import Profile from "./components/profile";


export default class App extends Component {
    render() {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
            store.dispatch(setToken(sessionStorage.getItem('token'),true));
            store.dispatch(setUser(sessionStorage.getItem('user'), true));
        }


        return (
            <Provider store={store}>
                <Fragment>
                    <PersistAppBar/>
                    <div id="content-root">
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Posts}/>
                                <Route path="/messages" component={Messages}/>
                                <Route path="/user/:username" component={Profile}/>
                            </Switch>
                        </Router>
                    </div>
                </Fragment>
            </Provider>)
    }
}
