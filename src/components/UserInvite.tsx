import { useEffect, useState } from "react";
import { Button, Header, List, Portal, Segment } from "semantic-ui-react";
import { Chat, DefaultApi, User } from "../api-client";

export default function UserInvite(props: {
  apiClient: DefaultApi;
  chatId?: string;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    (async () => {
      if (props.chatId) {
        const c = await props.apiClient.chatRead({ chatId: props.chatId });
        setChat(c);
      }
    })();
  }, [props]);

  useEffect(() => {
    (async () => {
      if (chat) {
        const usersFromApi = await props.apiClient.userList();
        const filtered = usersFromApi.filter(
          (user) => !chat.userIds.find((userId) => userId === user.id)
        );
        setUsers(filtered);
      }
    })();
  }, [props.apiClient, chat]);

  function selectUser(select: User) {
    setUser(select);
  }
  function handleClose() {
    setUser(undefined);
  }
  async function addUser() {
    if (user && chat) {
      const updated = await props.apiClient.chatUpdate({
        chatId: chat.id,
        chat: {
          id: chat.id,
          title: chat.title,
          userIds: chat.userIds.concat(user.id),
        },
      });
      setChat(updated);
      setUser(undefined);
    }
  }

  const userItems = users.map((user) => (
    <List.Item onClick={() => selectUser(user)}>{user.name}</List.Item>
  ));
  return (
    <div>
      <List>{userItems}</List>
      <Portal onClose={handleClose} open={!!user}>
        <Segment
          style={{
            left: "40%",
            position: "fixed",
            top: "50%",
            zIndex: 1000,
          }}
        >
          <Header>Hinzufügen</Header>
          <p>Willst du {user?.name} zum Chat hinzufügen?</p>

          <Button content="Ja" positive onClick={addUser} />
          <Button content="Nein" onClick={handleClose} />
        </Segment>
      </Portal>
    </div>
  );
}
