import { useState } from "react";
import { Button, Form } from "semantic-ui-react";

interface IMessageCreateProps {
  onSendMessage: (message: string) => void;
}

export default function MessageCreate({ onSendMessage }: IMessageCreateProps) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <Form className="chat-form" onSubmit={handleSubmit}>
      <Form.Input
        className="full-width"
        placeholder="Nachricht..."
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        content="Senden"
        className="br-16 "
        color="violet"
        size="large"
        type="submit"
      />
    </Form>
  );
}
