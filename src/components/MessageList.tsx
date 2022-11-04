import { useEffect, useState } from "react";
import { Feed } from "semantic-ui-react";
import { DefaultApi, Message as Msg, Chat } from "../api-client";

type MessageListProps = {
  apiClient: DefaultApi;
  chat?: Chat;
  newMessage?: string;
};

export default function MessageList(props: MessageListProps) {
  const [messages, setMessages] = useState<Msg[]>([]);

  useEffect(() => {
    if (props.chat) {
      props.apiClient.messageList({ chatId: props.chat.id }).then(setMessages);
    }
  }, [props]);

  const messageFeed = messages.map((message) => (
    <Feed.Event>
      <Feed.Label>{message.userId.substring(34)}</Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          {message.body}
          <Feed.Date>{message.createdAtUtc.toLocaleString()}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  ));

  return <Feed>{messageFeed}</Feed>;
}
