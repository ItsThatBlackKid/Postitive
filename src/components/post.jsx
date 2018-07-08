import React, {Component, Fragment} from "react";
import {POSTS} from "../config/Api";
import {mFromNow} from "../utils/TimeUtils";
import {Button} from "@material-ui/core"
import {authClient} from "../utils/ApiClient";
import "../static/css/posts.css"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Typography from "@material-ui/core/es/Typography/Typography";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import {Share} from "@material-ui/icons";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import UComment from "./userComment"
import CommentComposer from "./comment-composer";
import Icon from "@material-ui/core/es/Icon/Icon";
import {withStyles} from "@material-ui/core/styles/"
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";

const styles = {
    root: {
        width: '28px',
        height: '28px'

    },
};


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: {
                name: props.post.author,
                avatar: "",
            },
            current_user: sessionStorage.getItem('user'),
            hasToken: this.props.token && true,
            db_id: this.props.db_id,
            votes: this.props.votes,
            expand: false,
            comments: this.props.comments,
            upvoted: false,
            downvoted: false,
            snackbar_message: "",
            open_snack: false,
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    static setAuthor(author) {
        if (author == null) {
            return "Anonymous User";
        } else {
            return author
        }
    }

    handleExpandClick(e) {
        this.setState(state => ({expand: !this.state.expand}));
    }

    handleSnackClose() {
        this.setState({open_snack: false})
    }

    handleCommentSubmit(posted) {
        let comments = this.state.comments;
        if (posted) {
            comments.unshift(posted);
            this.setState({comments: comments})
        }
    }

    showSnackbar(message) {
        this.setState({snackbar_message: message, open_snack: true})
    }

    upvote(e) {
        const {hasToken} = this.state;
        if (this.state.upvoted || !hasToken) {
            this.showSnackbar("Anonymous Users can't upvote");
            return;
        }

        let post_id = this.state.db_id;

        authClient().post(POSTS + 'upvote/' + post_id).then((res) => {
            let votes = res.data.votes;
            this.setState({votes: votes, upvoted: true, downvoted: false});
        });

    }

    downvote() {
        const {hasToken} = this.state;
        if (this.state.downvoted || !hasToken) {
            this.showSnackbar("Anonymous Users can't downvote");
            return
        }
        let post_id = this.state.db_id;
        return authClient().post(
            POSTS + 'downvote/' + post_id
        ).then((response) => {
            let votes = response.data.votes;
            this.setState({votes: votes, upvoted: false, downvoted: true})
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        const {post, classes} = this.props;
        const {comments, hasToken,author} = this.state;
        const {name, avatar} = author;
        const numComments = comments.length;
        return (
            <Fragment>
                <Card className={"post"} id={post.id}>
                    <CardHeader
                        title={post.title}
                        avatar={(avatar) ? avatar : name ? name[0]: "A"}
                        subheader={
                            Post.setAuthor(post.author) + " | " + mFromNow(post.date_created)
                        }
                    />
                    <CardContent>
                        <Typography variant={"body1"}>
                            {post.statement}
                        </Typography>
                    </CardContent>
                    <CardActions id={post.id}>
                        <Button onClick={this.upvote}>Upvote</Button>
                        <Typography variant={"caption"}>{this.state.votes}</Typography>
                        <Button onClick={this.downvote}>Downvote</Button>

                        {
                            numComments > 0 ?
                                <IconButton onClick={(e) => this.handleExpandClick(e)}
                                            aria-expanded={this.state.expand}
                                            aria-label={"Comments"}>
                                    <Icon classes={{root: classes.root}}> {numComments}</Icon>
                                </IconButton>
                                :
                                <Button onClick={(e) => this.handleExpandClick(e)}>Comment</Button>
                        }


                        <IconButton><Share/></IconButton>
                    </CardActions>
                    <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                        <CommentComposer onCommentSubmit={this.handleCommentSubmit.bind(this)}
                                         parentID={this.state.db_id}/>
                        {comments.map(comment => (
                            <UComment key={comment.id} comment={comment}/>
                        ))}
                    </Collapse>
                </Card>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                          open={this.state.open_snack}
                          autoHideDuration={3000}
                          message={this.state.snackbar_message}
                          onClose={() => this.state.handleSnackClose()}
                />
            </Fragment>

        )
    }
}

Post.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Post)