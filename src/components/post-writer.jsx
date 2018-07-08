import React, {Component, Fragment} from "react";
import {POSTS} from "../config/Api";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input"
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/es/Button/Button";
import connect from "react-redux/es/connect/connect";
import {authClient, regClient} from "../utils/ApiClient";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import {Edit as EditIcon} from "@material-ui/icons"
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

const styles = theme => ({
    root: {
        display: 'block',
       // width: '648px',
    },

    multiline: {
        height: '200px',
    },

    input: {
        height: '200px'
    },

    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '30px',
    }
});


class Writer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            title: "",
            statement: "",
            author: props.user,
            openDialog: false,
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleClose() {
        this.setState({openDialog: false})
    }

    makePost(event) {
        event.preventDefault();


        if (this.props.token) {
            authClient().post(
                POSTS,
                {
                    "title": this.state.title,
                    "statement": this.state.statement,
                    "author": this.state.author,
                }
            ).catch(function (error) {
                console.log(error);
            }).then((res) => {
                this.setState({openDialog: false});
            });
        } else {
            regClient().post(
                POSTS, {
                    "title": this.state.title,
                    "statement": this.state.statement,
                    "author": (this.state.author != null) ? this.state.author : null
                }
            ).catch(function (error) {
                alert("ERROR");
                console.log(error)
            }).then((res) => {
                this.setState({openDialog: false});
            });
        }
    }


    render() {
        const {classes} = this.props;

        return <Fragment>
            <Button variant={"fab"} color="secondary" aria-label="edit" className={classes.fab}
                    onClick={(e) => this.handleDialogOpen()}>
                <EditIcon/>
            </Button>

            <Dialog open={this.state.openDialog} onClose={(e) => this.handleClose()}>
                <Input classes={{root: classes.root}} placeholder={"Post Title"} id="title"
                       onChange={this.handleChange.bind(this)}/>
                <Input classes={{root: classes.root, multiline: classes.multiline, input: classes.input}}
                       placeholder={"What's on your mind?"} multiline={true} id="statement"
                       onChange={this.handleChange.bind(this)}/>
                <DialogActions>
                    <Button type="submit" onClick={this.makePost.bind(this)}>Post</Button>
                </DialogActions>
            </Dialog>

        </Fragment>
    }

    handleDialogOpen() {
        this.setState({openDialog: true})
    }
}

Writer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {token: state.token, user: state.user}
};

export default withStyles(styles)(connect(mapStateToProps)(Writer));