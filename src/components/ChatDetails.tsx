import { Chat } from "../api-client";

type ChatProps = {
  chat?: Chat;
};

export default function ChatDetails(props: ChatProps) {
  return (
    <div>
      <h1>{props.chat ? props.chat.title : ''}</h1>
    </div>
  );
}
