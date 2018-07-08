import React, {Component} from "react";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {mFromNow, toLocalTime} from "../utils/TimeUtils";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/es/Button/Button";
import {withStyles} from "@material-ui/core/styles/"
import PropTypes from "prop-types";


const styles = {
    root: {
        height: '200px',
        width: '300px'
    }
};

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            motto: props.motto,
            subscribed: false,
            last_online: props.lastOnline,
            date_created: props.dateCreated,
        }
    }

    handleSubscribe() {
        this.setState(prev => ({subscribed: !prev.subscribed}));
    }

    render() {
        const {classes} = this.props;
        const {motto, subscribed, last_online, date_created} = this.state;
        console.log(this.props.username);

        return(
            <Card classes={{root: classes.root}} id={"p-card"}>
                <CardHeader title={this.props.username} subheader={last_online? mFromNow(last_online): "Offline"}/>
                <CardContent>
                    <Typography variant={"body1"}>
                        {motto}
                    </Typography>
                    <Typography>
                        Created: {toLocalTime(date_created)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={(e) => this.handleSubscribe()}>{subscribed ? "Subscribed": "Subscribe"}</Button>
                    <Button>Message</Button>
                </CardActions>
            </Card>
        )
    }
}

ProfileCard.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCard)