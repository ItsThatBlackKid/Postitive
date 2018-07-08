import React, {Fragment} from "react";
import Post from "./post"
import Writer from "./post-writer"
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import {withStyles} from "@material-ui/core/styles/"
import PropTypes from "prop-types";
import "../static/css/posts.css"

const styles = {
    root: {
        margin: '0 auto',
        width: '400px'
    }
};

function PostList(props) {
    let {classes, isLoaded, posts, error} = props;

    if (error) {
        return <Fragment>
            <Writer/>
            Error: {error.message}
        </Fragment>
    }

    if (!isLoaded) {
        return <Fragment>
            <Writer/>
            <CircularProgress color={"secondary"} thickness={3.6} classes={{root: classes.root}}/>
        </Fragment>
    }

    // if it is loaded you know the rest
    return (
        <Fragment>
            <div id="flex-posts">
                {(error) ? <Writer/> : (!isLoaded) ?
                        <Fragment>
                        <Writer/>
                        <CircularProgress color = {"secondary"} thickness={3.6} classes={{root: classes.root}}/>
                        </Fragment> : posts.map(post => (
                            <Post key={post.id} post={post} comments={post.comments} votes={post.votes} db_id = {post.id}/>
                    ))
                }
                <Writer/>
                {posts.map(post => (
                    <Post key={post.id} post={post} comments={post.comments} votes={post.votes} db_id={post.id}/>
                ))}
            </div>
        </Fragment>
    )
}

PostList.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);