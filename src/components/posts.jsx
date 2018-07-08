import React, {Component} from "react";
import axios from "axios";
import {page_param, POSTS} from "../config/Api";
import Request from "axios-request-handler";
import "../static/css/posts.css"
import PostList from "./posts-comp"
import {regClient} from "../utils/ApiClient";
import Button from "@material-ui/core/es/Button/Button";


export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
            next: null,
            page_info: {
                current: 0,
                next: 1,
                previous: -1,
            },
        }
    }

    getPostsFromServer() {
        const {current, next} = this.state.page_info;

        regClient().get(
          POSTS + page_param + 1,
        ).then((res) => {
            this.setState({
                isLoaded: true,
                posts: res.data.results,
                page_info: {
                    current: next,
                    next: next +1,
                    previous: current,
                },
                next: res.data.next,
            });
        }).catch((error) => {
            this.setState({error: error})
        });

    }

    componentDidMount() {
       this.getPostsFromServer();
    }

    static setAuthor(author) {
        if (author == null) {
            return "Anonymous User";
        }

        return author
    }

    upvotePost(e) {
        let post_id = e.target.id;
        console.log(e.target.id);
        return axios.post(
            POSTS + 'upvote/' + post_id
        ).then(function () {
            alert("Post upvoted");
        }).catch(function (error) {
            console.log(error);
        })
    }

    downvotePost(e) {
        let post_id = e.target.id;
        console.log(post_id);
        return axios.post(
            POSTS + 'downvote/' + post_id
        ).then(function () {
            let obj = this.state.posts.filter(function (obj) {
                return obj.id === post_id;
            });

            obj.votes--;
           let posts = this.state.posts;
            posts[post_id -1] = obj;
            this.setState({posts: posts });

        }).catch(function (error) {
            console.log(error);
        })
    }

    handleScroll() {

    }


    render() {
        const {error, isLoaded, posts, next} = this.state;
        const {current} = this.state.page_info;

        return (
            <div id="content-flex">
                <PostList error={error} isLoaded={isLoaded} posts={posts} />
            </div>)
    }
}