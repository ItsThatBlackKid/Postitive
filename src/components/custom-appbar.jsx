import React, {Component, Fragment} from 'react';
import AppBar from "@material-ui/core/AppBar"
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import {Menu as MenuIcon} from "@material-ui/icons"
import Typography from "@material-ui/core/es/Typography/Typography";
import UserFormDialog from "./user-form-dialog";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import connect from "react-redux/es/connect/connect";

const styles = {
    root: {
        flexGrow: 1,
    },

    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class PersistAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            isLoggedIn: false,
            anchorEl: null,
            token: props.token,
            user: props.user,
        }
    }

    showLoginDialog() {
        this.setState({openDialog: true});
    }

    handleLogin() {
        this.setState({
            isLoggedIn: true,
            token: this.props.token,
            user: this.props.user
        })
    }

    handleLogout() {
        sessionStorage.clear();
        this.setState({
            isLoggedIn: false,
            token: null,
            user: null,
        })
    }

    handleClose() {
        this.setState({anchorEl: null})
    }

    handleMenu(event) {
        this.setState({anchorEl: event.currentTarget})
    }


    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const token = this.state.token;
        return (
            <AppBar>
                <Toolbar>
                    <IconButton className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.flex} variant="title" color={"inherit"}>Posititive</Typography>

                    {
                        (token) ?
                            <Fragment>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleMenu(e)}>
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id={"menu-appbar"}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={(e) => this.handleClose()}>
                                    <MenuItem onClick={(e) => this.handleClose()}>{this.props.user}</MenuItem>
                                    <MenuItem onClick={(e) => this.handleLogout()}>Logout</MenuItem>
                                </Menu>
                            </Fragment>
                            :
                            <UserFormDialog onLogin={(e) => this.handleLogin()} open={this.state.openDialog}/>
                    }
                </Toolbar>
            </AppBar>
        )

        // return (
        //     <AppBar>
        //         <Toolbar>
        //             <IconButton className={classes.menuButton}>
        //                 <MenuIcon/>
        //             </IconButton>
        //             <Typography className={classes.flex} variant="title" color="inherit">Postitive</Typography>
        //             <UserFormDialog onLogin={(e) => this.handleLogin()} open={this.state.openDialog}/>
        //         </Toolbar>
        //     </AppBar>
        // )

    }
}

PersistAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {token: state.token, user: state.user}
};

export default withStyles(styles)(connect(mapStateToProps)(PersistAppBar));