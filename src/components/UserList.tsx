import { Header, List } from "semantic-ui-react";
import { User } from "../api-client";
import Avatar from "./Avatar";

interface IUserListProps {
  users: User[];
}

export default function UserList({ users }: IUserListProps) {
  const userListItems = users.map((user) => (
    <List.Item className="chat-list-item" key={user.id}>
      <Avatar avatarUrl={user.avatarUrl} />
      <Header className="chat-list-item-label" size="tiny">
        {user.name}
      </Header>
    </List.Item>
  ));

  return <List>{userListItems}</List>;
}
