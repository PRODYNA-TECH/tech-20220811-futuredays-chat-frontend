import React, { useEffect, useState } from "react";

import { List } from "semantic-ui-react";
import { Configuration, DefaultApi, Chat } from "../../api-client";

export default function ChatList(props: any) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const client = new DefaultApi(
      new Configuration({
        apiKey: "kWF0t3ZgQf_yaew97ac5-NW29g2O8FTGUr2CIVcVWW-FAzFu544F6Q==",
        basePath: "https://futuredays.azurewebsites.net",
      })
    );
    client.chatList().then(setChats);
  }, []);

  const listItems = chats.map((chat) => <List.Item>{chat.title}</List.Item>);

  return <List>{listItems}</List>;
}
