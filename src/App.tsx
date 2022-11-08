import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { useEffect, useState } from "react";
import { User, Chat, Message } from "./api-client";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import Login from "./components/Login";
import ChatList from "./components/ChatList";
import ChatCreate from "./components/ChatCreate";
import MessageList from "./components/MessageList";
import MessageCreate from "./components/MessageCreate";
import UserList from "./components/UserList";
import UserInvite from "./components/UserInvite";
import {
  chatUpdate,
  createChatAsync,
  createMessageAsync,
  listChatMessagesAsync,
  listChatsAsync,
  listUsersAsync,
} from "./api";

export default function App() {
  const [user, setUser] = useState<User>();
  const [userList, setUserList] = useState<User[]>();
  const [activeChat, setActiveChat] = useState<Chat>();
  const [chatList, setChatList] = useState<Chat[]>();
  const [chatUsers, setChatUsers] = useState<string[]>();
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (typeof storedUser == "undefined") {
      setUser(JSON.parse(storedUser!));
    }
  }, []);

  useEffect(() => {
    if (user) {
      listChatsAsync(user.id).then((chatList) => setChatList(chatList));
      listUsersAsync().then((users) => setUserList(users));
    }
  }, [user]);

  useEffect(() => {
    if (activeChat) {
      setChatUsers(activeChat.userIds);
      listChatMessagesAsync(activeChat?.id).then((messages) =>
        setMessages(messages)
      );
    }
  }, [activeChat]);

  async function handleChatCreate(chatTitle: string) {
    if (user) {
      try {
        await createChatAsync(chatTitle, user!.id);
        const chatList = await listChatsAsync(user.id);
        setChatList(chatList);
      } catch (err) {
        console.log(err);
        const chatList = await listChatsAsync(user.id);
        setChatList(chatList);
      }
    }
  }

  async function handleAddChatUser(user: User) {
    if (user && activeChat) {
      const updatedChat = await chatUpdate(activeChat, user.id);
      setActiveChat(updatedChat);
    }
  }

  async function handleSendMessage(message: string) {
    if (user && activeChat) {
      await createMessageAsync(activeChat.id, user.id, message);
      const messages = await listChatMessagesAsync(activeChat?.id);
      setMessages(messages);
    }
  }

  async function login(username: string) {
    const userList = await listUsersAsync();
    const filtered = userList.filter((user) => user.name === username);
    if (filtered.length > 0) {
      const newUser = filtered[0];
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(newUser);
    }
  }

  function logout() {
    window.localStorage.removeItem("user");
    setUser(undefined);
    setUserList(undefined);
    setChatList(undefined);
    setActiveChat(undefined);
    setChatUsers(undefined);
    setMessages(undefined);
  }

  if (user) {
    return (
      <Container className="chat-container">
        <div className="chat-header bg-main">
          <Header size="large">Hallo {user.name}</Header>

          <Button
            className="br-16"
            color="violet"
            size="large"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        <Grid divided className="grid-container">
          <Grid.Column className="grid-w-4 no-shadow" width="4">
            <div className="wrapper br-32 bg-white">
              <Header size="large">Chats</Header>
              <ChatList chatList={chatList!} setActiveChat={setActiveChat} />
              <ChatCreate onChatCreate={handleChatCreate} />
            </div>
          </Grid.Column>

          <Grid.Column className="wrapper br-32 bg-white no-shadow" width="8">
            {activeChat && messages && userList && (
              <>
                <Header size="large">{activeChat.title}</Header>
                <MessageList messages={messages} userList={userList} />
                <MessageCreate onSendMessage={handleSendMessage} />
              </>
            )}
          </Grid.Column>
          <Grid.Column className="grid-w-4 no-shadow" width="4">
            <div className="wrapper br-32 bg-white">
              {chatUsers && userList && (
                <>
                  <Header size="large">Teilnehmer</Header>
                  <UserList chatUsers={chatUsers} userList={userList} />
                  <Header size="large">Hinzufügen</Header>
                  <UserInvite
                    chatUsers={chatUsers}
                    userList={userList}
                    onAddChatUser={handleAddChatUser}
                  />
                </>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container>
        <Login onLogin={login} />
      </Container>
    );
  }
}
