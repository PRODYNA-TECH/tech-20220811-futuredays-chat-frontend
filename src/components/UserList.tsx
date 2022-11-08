import { Header, List } from "semantic-ui-react";
import { User } from "../api-client";
import Avatar from "./Avatar";

interface IUserListProps {
  chatUsers: string[];
  userList: User[];
}

export default function UserList({ chatUsers, userList }: IUserListProps) {
  const currentChatUsers = userList.filter((user) =>
    chatUsers.includes(user.id)
  );

  const userListItems = currentChatUsers.map((user) => (
    <List.Item className="chat-list-item" key={user.id}>
      <Avatar isUserAvatar />
      <Header className="chat-list-item-label" size="tiny">
        {user.name}
      </Header>
    </List.Item>
  ));

  return <List>{userListItems}</List>;
}
