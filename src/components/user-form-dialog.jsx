import React, {Component, Fragment} from 'react';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/es/TextField/TextField";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import {ACCOUNTS} from "../config/Api"
import {login, register} from "../utils/Auth";
import {regClient} from "../utils/ApiClient";

const styles = {
    root: {
        display: 'block',
        margin: '0 auto',
    }
};

class UserFormDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            expanded: false,
            username: "",
            email: "",
            password: "",
            doMatch: false
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    isValidated() {
        return !(this.state.username !== undefined && this.state.password !== undefined && this.state.password.length > 5);
    }

    handleOpen() {
        this.setState({open: true})
    }

    handleClose() {
        this.setState({open: false})
    }

    confirmPassword(e) {
        let value = e.target.value;
        let match = value === this.state.password;
        this.setState({
            doMatch: match
        })

    }

    handleLogin(e) {
        //TODO: add login logic
        login(this.state.username, this.state.password).then((res) => {
            this.setState({open:false});
            this.props.onLogin()
        })
    }

    handleRegister(e) {
        const {expanded} = this.state;

        let formData = new FormData();
        let img = document.querySelector('profile_pic');

        if (!expanded) {
            this.setState({expanded: true});
        } else {
            //TODO: register user information
            register(this.state.username, this.state.email, this.state.password).then(
                () => {
                    this.setState({open: false});
                    this.handleLogin()
                }
            );
        }

    }

    render() {
        const {username, email, password} = this.state;
        const classes = this.props.classes;
        return (
            <Fragment>
                <Button onClick={(e) => this.handleOpen()} color="primary">Login</Button>
                <Dialog open={this.state.open} onClose={(e) => this.handleClose()}>
                    <DialogTitle id="fm-title">Login or Register</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your username and last name below
                        </DialogContentText>

                        <TextField
                            label="Username"
                            classes={{root: classes.root}}
                            value={username}
                            id="username"
                            onChange={(e) => this.handleChange(e)}
                        />

                        <TextField classes={{root: classes.root}} id="password" value={password}
                                   onChange={(e) => this.handleChange(e)}
                                   label="Password"
                                   type={"password"}/>

                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <TextField
                                classes={{root: classes.root}}
                                error={!this.state.doMatch}
                                onChange={(e) => this.confirmPassword(e)}
                                label="Confirm password"
                                type="password"
                            />

                            <TextField
                                classes={{root: classes.root}} id="email" value={email}
                                onChange={(e) => this.handleChange(e)}
                                label="Email"
                            />


                        </Collapse>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => this.handleLogin(e)}>Login</Button>
                        <Button onClick={(e) => this.handleRegister(e)}>Register</Button>
                        <Button onClick={(e) => this.handleClose()}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }


}

UserFormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserFormDialog)