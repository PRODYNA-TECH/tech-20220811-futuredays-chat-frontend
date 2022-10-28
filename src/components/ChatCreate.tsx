import { useState } from "react";
import { Button, Header, Input, Portal, Segment } from "semantic-ui-react";
import { DefaultApi } from "../api-client";

export default function ChatCreate(props: {
  apiClient: DefaultApi;
  userId: string;
}) {
  const [open, setOpen] = useState<boolean>();
  const [chatTitle, setChatTitle] = useState<string>();

  function onInputChange(e: any, data: any) {
    setChatTitle(data.value);
  }
  function handleClose() {
    setChatTitle(undefined);
    setOpen(false);
  }
  async function onChatCreate() {
    setOpen(false);
    await props.apiClient.chatCreate({
      chatCreate: { title: chatTitle!, userIds: [props.userId] },
    });
    setChatTitle(undefined);
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create</Button>
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
          <p>Gib dem neuen Chat einen Namen</p>
          <Input onChange={onInputChange}></Input>
          <Button content="OK" positive onClick={onChatCreate} />
          <Button content="Abbrechen" onClick={handleClose} />
        </Segment>
      </Portal>
    </div>
  );
}
