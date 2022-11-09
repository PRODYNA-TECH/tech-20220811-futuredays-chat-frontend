import { Header, Icon, List } from "semantic-ui-react";
import { Chat } from "../api-client";
import Avatar from "./Avatar";

interface IChatListProps {
  chatList: Chat[];
  setActiveChat: (chat: Chat) => void;
}

export default function ChatList({ chatList, setActiveChat }: IChatListProps) {
  const chatListItems = chatList?.map((chat) => (
    <List.Item
      className="chat-list-item"
      key={chat.id}
      as="a"
      onClick={() => setActiveChat(chat)}
    >
      <Icon name="chat" size="large"/>
      <Header className="chat-list-item-label" size="tiny">
        {chat.title}
      </Header>
    </List.Item>
  ));

  return <List>{chatListItems}</List>;
}
