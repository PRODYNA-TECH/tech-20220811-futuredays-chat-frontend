import React from "react";
import { useState } from "react";
import { Button, Header, Input, Portal, Segment } from "semantic-ui-react";

interface IChatCreateProps {
  onChatCreate: (chatTitle: string) => void;
}

export default function ChatCreate({ onChatCreate }: IChatCreateProps) {
  const [open, setOpen] = useState<boolean>();
  const [chatTitle, setChatTitle] = useState<string>("");

  function handleChatCreate() {
    setOpen(false);
    onChatCreate(chatTitle);
  }

  function handleInputChange(e: any, data: any) {
    setChatTitle(data.value);
  }

  function handleClose() {
    setChatTitle("");
    setOpen(false);
  }

  return (
    <div>
      <Button
        className="full-width br-16"
        color="violet"
        content="Chat erstellen"
        size="large"
        onClick={() => setOpen(true)}
      />
      <Portal onClose={handleClose} open={open}>
        <Segment
          style={{
            left: "40%",
            position: "fixed",
            top: "50%",
            zIndex: 1000,
          }}
        >
          <Header>Chat Erstellen</Header>
          <div style={{ marginBottom: 12 }}>
            <p>Wie soll dein Chat heißen?</p>
            <Input onChange={handleInputChange}></Input>
          </div>
          <Button
            content="Erstellen"
            className="br-16"
            color="violet"
            size="large"
            onClick={handleChatCreate}
          />
          <Button
            content="Abbrechen"
            className="br-16"
            size="large"
            onClick={handleClose}
          />
        </Segment>
      </Portal>
    </div>
  );
}
