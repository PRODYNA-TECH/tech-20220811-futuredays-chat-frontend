import { useState } from "react";
import { Button, Header, List, Portal, Segment } from "semantic-ui-react";
import { User } from "../api-client";
import Avatar from "./Avatar";

interface IUserInviteProps {
  chatUsers: string[];
  userList: User[];
  onAddChatUser: (user: User) => void;
}

export default function UserInvite({
  chatUsers,
  userList,
  onAddChatUser,
}: IUserInviteProps) {
  const [user, setUser] = useState<User>();

  function handleAddChatUser() {
    if (user) {
      onAddChatUser(user);
      setUser(undefined);
    }
  }

  function selectUser(select: User) {
    setUser(select);
  }

  function handleClose() {
    setUser(undefined);
  }

  const userForSelection = userList.filter(
    (user) => !chatUsers.includes(user.id)
  );

  const userListItems = userForSelection.map((user) => (
    <List.Item
      className="chat-list-item"
      key={user.id}
      onClick={() => selectUser(user)}
      style={{
        cursor: "pointer",
      }}
    >
      <Avatar />
      <Header className="chat-list-item-label" size="tiny">
        {user.name}
      </Header>
    </List.Item>
  ));

  return (
    <div>
      <List>{userListItems}</List>
      <Portal onClose={handleClose} open={!!user}>
        <Segment
          style={{
            left: "38%",
            position: "absolute",
            top: "50%",
            zIndex: 1000,
          }}
          size="large"
        >
          <Header>Hinzufügen</Header>
          <p>Willst du {user?.name} zum Chat hinzufügen?</p>

          <Button
            content="Ja"
            className="br-16"
            color="violet"
            size="large"
            onClick={handleAddChatUser}
          />
          <Button
            content="Nein"
            className="br-16"
            size="large"
            onClick={handleClose}
          />
        </Segment>
      </Portal>
    </div>
  );
}
