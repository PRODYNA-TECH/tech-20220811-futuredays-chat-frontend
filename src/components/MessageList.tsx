import { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import { DefaultApi, Message, Chat } from "../api-client";

type MessageListProps = {
  apiClient: DefaultApi;
  chat?: Chat;
  newMessage?: string
};

export default function MessageList(props: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (props.chat) {
      props.apiClient.messageList({ chatId: props.chat.id }).then(setMessages);
    }
  }, [props]);

  const messageFeed = messages.map(message => <List.Item>{message.body}</List.Item>)

  return <List>
    {messageFeed}
  </List>
}
