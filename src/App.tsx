import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./components/Login/Login";
import ChatList from './components/ChatList/ChatList';

type MyProps = {};

type MyState = {
    username: string | null;
};

class App extends React.Component<MyProps, MyState> {

    state: MyState = {
        username: null,
    };

    setUsername = (userName: string) => {
        this.setState(() => ({
            username: userName
        }));
    }

    render() {

        if(this.state.username){
            return (
                <BrowserRouter>
                    <Chat username={this.state.username} />
                    <ChatList/>
                </BrowserRouter>
            );
        }else {
            return (
                <Login setUserName={this.setUsername}/>
            );
        }
    }
}

export default App;
