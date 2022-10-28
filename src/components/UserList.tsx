import { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import { DefaultApi, User } from "../api-client";

export default function UserList(props: {
  apiClient: DefaultApi;
  userIds?: string[];
  onUserSelection?: (userId: string) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    props.apiClient.userList().then((usersFromApi) => {
      const filtered = usersFromApi.filter((user) =>
        props.userIds?.find((userId) => userId === user.id)
      );
      setUsers(filtered);
    });
  }, [props]);

  function onUserClick(user: User) {
    if (props.onUserSelection) {
      props.onUserSelection(user.id);
    }
  }

  const items = users.map((user) => (
    <List.Item onClick={() => onUserClick(user)}>{user.name}</List.Item>
  ));
  return <List>{items}</List>;
}
