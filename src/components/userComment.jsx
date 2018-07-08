import React, {Component} from "react";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import {mFromNow} from "../utils/TimeUtils";
import Typography from "@material-ui/core/es/Typography/Typography";

export default class UComment extends Component {

     static setAuthor(author) {
        if (!author) {
            return "Anonymous User";
        } else {
            return author
        }
    }
    render() {
        const {comment} = this.props;
        return <CardContent>
            <Typography variant={"caption"}>
                <a href={'/user/' + comment.author}>{UComment.setAuthor(comment.author)}</a> | {mFromNow(comment.date_created)}</Typography>
            <Typography variant={"body1"}>{comment.statement}</Typography>
        </CardContent>
    }
}