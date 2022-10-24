import React from "react";

type MyProps = {
    username: string;
};

type MyState = {};

class Chat extends React.Component<MyProps, MyState> {

    render() {
        return(
            <div>
                <h1>hello {this.props.username}</h1>
            </div>
        );
    }
}

export default Chat;
