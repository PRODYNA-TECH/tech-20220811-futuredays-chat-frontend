import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { DefaultApi, User } from "../api-client";

type LoginProps = {
  apiClient: DefaultApi;
  setUser: (user: User) => void;
};

export default function Login(props: LoginProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = event.currentTarget.elements.namedItem(
      "inputUserName"
    ) as HTMLInputElement;
    props.apiClient.userList().then((users) => {
      const filtered = users.filter((user) => user.name === name.value);
      if (filtered.length > 0) {
        props.setUser(filtered[0]);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h1">Please sign in</Header>
      <Form.Field>
        <Form.Input label='Username' id='inputUserName'/>
      </Form.Field>
      <Button type="submit">Sign in</Button>
    </Form>
  );
}
