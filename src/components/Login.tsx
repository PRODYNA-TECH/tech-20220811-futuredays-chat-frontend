import React, { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";

interface ILoginProps {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: ILoginProps) {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username);
  };

  function handleInputChange(e: any, data: any) {
    setUsername(e.target.value);
  }

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <div className="login-card bg-white br-32">
        <Header subheader size="huge" color="violet">
          Willkommen beim Zukunftstag!
        </Header>
        <Header className="login-form-subheader" subheader size="medium">
          Baue deine eigene Chat-Applikation 😎
        </Header>
        <Form.Field className="login-form-input">
          <Form.Input label="Username" onChange={handleInputChange} />
        </Form.Field>
        <Button
          className="login-form-button br-16"
          color="violet"
          size="large"
          type="submit"
        >
          Jetzt anmelden
        </Button>
      </div>
    </Form>
  );
}
