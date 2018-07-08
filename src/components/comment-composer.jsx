import React, {Component} from "react";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Input from "@material-ui/core/es/Input/Input";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/es/Button/Button";
import {COMMENTS} from "../config/Api";
import connect from "react-redux/es/connect/connect";
import {authClient, regClient} from "../utils/ApiClient"


const styles = {

    multline: {
        overflow: 'hidden',
    },

    input: {
        overflow: 'auto',
        height: '20px',
    }
};

export class CommentComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_post: props.parentID,
            statement: "",
        };

        this.inputRef = React.createRef();
    }

    handleInputChange(e) {
        this.setState({
            statement: e.target.value
        })
    }

    submitComment(e) {
        const {token} = this.props;
        const {statement, parent_post} = this.state;
        const author = sessionStorage.getItem('user');

        if (token) {
            console.log("token exists");
            return authClient().post(
                COMMENTS, {
                    "author": author,
                    "statement": statement,
                    "posted_to": parent_post,
                }
            ).then((res) => {
                this.setState({statement: ""});
                this.props.onCommentSubmit(res.data)
            })
        }

        regClient().post(
            COMMENTS, {
                "author": author,
                "statement": statement,
                "posted_to": parent_post,
            }
        ).then((res) => {
            this.setState({statement: ""});
            this.props.onCommentSubmit(res.data)
        })
    }

    render() {
        const {classes} = this.props;
        const {statement} = this.state;
        return (
            <CardActions>
                <Input value={statement} ref={this.inputRef}
                       onChange={(e) => this.handleInputChange(e)}
                       classes={{input: classes.input}} fullWidth={true}
                       multiline={true} placeholder={"Speak your mind!"}/>
                <Button onClick={() => this.submitComment()}>Post</Button>
            </CardActions>
        )
    }
}

CommentComposer.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {token: state.token}
};

export default withStyles(styles)(connect(mapStateToProps)(CommentComposer))