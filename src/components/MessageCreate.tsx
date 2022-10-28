import { useState } from "react";
import { Form } from "semantic-ui-react";
import { Chat, DefaultApi, User } from "../api-client";

export default function MessageCreate(props: {
  apiClient: DefaultApi;
  onNewMessage: (message: string) => void;
  user?: User;
  chat?: Chat;
}) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (props.user && props.chat) {
      props.apiClient
        .messageCreate({
          chatId: props.chat?.id,
          messageCreate: { body: message, userId: props.user.id },
        })
        .then((m) => {
          setMessage("")
          props.onNewMessage(message)
        })
        .catch((e) => console.error("Message submit failed", e));
    }
  };

  if (props.chat) {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  } else {
    return <Form></Form>
  }
}
