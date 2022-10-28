import { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import { DefaultApi, Chat, User } from "../api-client";

export default function ChatList(props: {
  apiClient: DefaultApi;
  user: User;
  setChat: (chat: Chat) => void;
}) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    props.apiClient.userChatList({ userId: props.user.id }).then(setChats);
  }, [props]);

  const listItems = chats.map((chat) => (
    <List.Item as="a" onClick={() => props.setChat(chat)}>
      {chat.title}
    </List.Item>
  ));

  return <List>{listItems}</List>;
}
