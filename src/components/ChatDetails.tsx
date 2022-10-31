import { Header } from "semantic-ui-react";
import { Chat } from "../api-client";

type ChatProps = {
  chat?: Chat;
};

export default function ChatDetails(props: ChatProps) {
  return (
    <div>
      <Header>{props.chat ? props.chat.title : ''}</Header>
    </div>
  );
}
