import React, {Component}  from "react";
import Request from "axios-request-handler";
import axios from "axios";

import {MESSAGES} from "../config/Api";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            message: {
              author: null,
              body: "",
            },
            error: null,
        }
    }



    handleChange(e) {
        this.setState({
            message: {
                author: this.state.user,
                body: e.target.value,
            }
        });
    }

    sendMessage(e) {
        e.preventDefault();

        return axios.post(
            MESSAGES, this.state.message
        ).then(function () {
            //do nothing
        })
    }

    messageBox = <div>
        <input type="text" onChange={(e) => this.handleChange(e)}/>
        <button onClick={(e) => this.sendMessage(e)}>Send</button>
    </div>;

    render() {
        const error = this.state.error;

        if(!error) {
            return(
                <div>
                    <p>{error}</p>
                    {this.messageBox}
                </div>
            )
        }
    }




}

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            messages: [],
            error: "",
        }
    }

    listenForMessage() {
       let  mRequest = new Request(MESSAGES, {
            cancelable: true,
            errorHandler:(error) => {
                this.setState({error: error})
            }
        });

        mRequest.poll(4000).get((response) => {
            this.setState({
                messages: response.data
            })
        })
    }

    componentDidMount() {
        this.listenForMessage();
    }

    render() {
        const {messages} = this.state;

        if(!messages.length >0) {
            return <div className={"notice"}>
                <h1>No messages so far... send the first one below.</h1>
                <MessageBox/>
            </div>
        } else {
               return <div>
            {messages.map(message => (
                <div id={"message-area"}>
                    <div className="message-box" >
                        <p>{message.body}</p>
                    </div>
                </div>
            ))}
            <MessageBox/>
        </div>
        }


    }

}