import React from "react";
import { Feed } from "semantic-ui-react";
import { Message, User } from "../api-client";
import Avatar from "./Avatar";

interface IMessageListProps {
  messages: Message[];
  userList: User[];
}

export default function MessageList({ messages, userList }: IMessageListProps) {
  function findUsername(userId: string) {
    const user = userList.find((user) => user.id === userId);

    if (user) {
      return user.name;
    }
    return "";
  }
  
  function findAvatarUrl(userId: string) {
    const user = userList.find((user) => user.id === userId);

    if (user) {
      return user.avatarUrl;
    }
    return "";
  }

  const messageFeed = messages.map((message, i) => (
    <Feed>
      <Feed.Event>
        <Feed.Content
          className="feed-content"
          // className={
          //   i % 2 == 0 ? "feed-content" : "feed-content feed-content-justified"
          // }
        >
          <div>
            <Avatar avatarUrl={findAvatarUrl(message.userId)} disableCustomSize />
            <Feed.User className="feed-user primary">
              {findUsername(message.userId)}
            </Feed.User>{" "}
            <Feed.Summary className="feed-message">{message.body}</Feed.Summary>
          </div>
        </Feed.Content>
        <Feed.Meta className="feed-meta">
          <Feed.Date>{`${message.createdAtUtc.getHours()}:${message.createdAtUtc.getMinutes()}`}</Feed.Date>
        </Feed.Meta>
      </Feed.Event>
    </Feed>
  ));

  return <Feed>{messageFeed}</Feed>;
}
