import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./App"
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#942c75',
        },
        secondary: {
            main:'#abd442'
        },
    }
});


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
