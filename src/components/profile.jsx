import React, {Component, Fragment} from "react"
import connect from "react-redux/es/connect/connect";
import {authClient} from "../utils/ApiClient";
import {ACCOUNTS} from "../config/Api";
import PostList from "./posts-comp";
import ProfileCard from "./profile-card"
import "../static/css/profile.css"


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            userData: {},
            token: props.token,
            isLoaded: false,
            error: null,
            posts: [],
            comments: [],
        }
    }

    getUserData() {
        const {match: {params}} = this.props;

        console.log(authClient().baseURL);

        authClient().get(
            ACCOUNTS + params.username + '/',
        ).then((res) => {
            console.log(res.data);
            this.setState({
                isLoaded: true,
                userData: res.data
            })
        }).catch((error) => {
            console.log(error.response);
            this.setState({error: error.response.status})
        })
    }

    componentDidMount() {
        this.getUserData();
    }

    render() {
        const {match: {params}} = this.props;
        const {userData, error, isLoaded} = this.state;
        const {posts} = userData;
        console.log(userData.username);

        if (error) {
            return (
                <div id="content-root">
                    <p>User with username: {params.username} could not be found</p>
                    <p>Error code: {error.status}</p>
                </div>
            )
        }

        return (
            <Fragment>
                <div id="content-flex">
                    <PostList error={error} isLoaded={isLoaded} posts={posts}/>
                     <ProfileCard username={userData.username} motto={userData.motto}
                                 lastOnline={userData.last_login}
                                 dateCreated={userData.date_created}/>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {token: state.token, user: state.user}
};

export default connect(mapStateToProps)(Profile)