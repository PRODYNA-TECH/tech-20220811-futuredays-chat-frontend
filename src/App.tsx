import { useState } from "react";
import Login from "./components/Login";
import ChatList from "./components/ChatList";
import { Configuration, DefaultApi, User, Chat } from "./api-client";
import "semantic-ui-css/semantic.min.css";
import { Container, Grid } from "semantic-ui-react";
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

  if (user) {
    return (
      <Grid columns="2" divided container>
        <Grid.Column width="2">
          <ChatList apiClient={client} user={user} setChat={setChat} />
          <ChatCreate apiClient={client} userId={user.id}></ChatCreate>
        </Grid.Column>
        <Grid.Column width="5" stretched>
          <ChatDetails chat={chat} />
          <MessageList apiClient={client} chat={chat} newMessage={newMessage} />
          <MessageCreate
            apiClient={client}
            chat={chat}
            user={user}
            onNewMessage={setNewMessage}
          />
        </Grid.Column>
        <Grid.Column width="2">
          <UserList apiClient={client} userIds={chat?.userIds} />
          <UserInvite apiClient={client} chatId={chat?.id} />
        </Grid.Column>
      </Grid>
    );
  } else {
    return (
      <Container>
        <Login setUser={setUser} apiClient={client} />
      </Container>
    );
  }
}
