import { useEffect, useState } from "react";
import Login from "./components/Login";
import ChatList from "./components/ChatList";
import { Configuration, DefaultApi, User, Chat } from "./api-client";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Divider, Grid, Header } from "semantic-ui-react";
import ChatDetails from "./components/ChatDetails";
import MessageList from "./components/MessageList";
import MessageCreate from "./components/MessageCreate";
import UserList from "./components/UserList";
import UserInvite from "./components/UserInvite";
import ChatCreate from "./components/ChatCreate";

const client = new DefaultApi(
  new Configuration({
    apiKey: "kWF0t3ZgQf_yaew97ac5-NW29g2O8FTGUr2CIVcVWW-FAzFu544F6Q==",
    basePath: "https://futuredays.azurewebsites.net",
  })
);

export default function App() {
  const [user, setUser] = useState<User>();
  const [chat, setChat] = useState<Chat>();
  const [newMessage, setNewMessage] = useState<string>();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function onLogin(user: User) {
    window.localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    window.localStorage.removeItem('user');
    setUser(undefined);
  }

  if (user) {
    return (
      <Container>
        <Header>😎 Zukunftstag 😎</Header>
        <Divider />
        <Grid divided>
          <Grid.Column width="2">
            <Header>Chats </Header>
            <ChatList apiClient={client} user={user} setChat={setChat} />
            <ChatCreate apiClient={client} userId={user.id}></ChatCreate>
          </Grid.Column>
          <Grid.Column width="12">
            <ChatDetails chat={chat} />
            <MessageList
              apiClient={client}
              chat={chat}
              newMessage={newMessage}
            />
            <MessageCreate
              apiClient={client}
              chat={chat}
              user={user}
              onNewMessage={setNewMessage}
            />
          </Grid.Column>
          <Grid.Column width="2">
            <Header>Teilnehmer</Header>
            <UserList apiClient={client} userIds={chat?.userIds} />
            <Divider />
            <Header>Hinzufügen</Header>
            <UserInvite apiClient={client} chatId={chat?.id} />
            <Divider></Divider>
            <Button onClick={logout}>Logout</Button>
          </Grid.Column>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container>
        <Login setUser={onLogin} apiClient={client} />
      </Container>
    );
  }
}
