import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { useEffect, useState } from "react";
import { User, Chat, Message } from "./api-client";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import Login from "./components/Login";
import ChatList from "./components/ChatList";
import ChatCreate from "./components/ChatCreate";
import MessageList from "./components/MessageList";
import MessageCreate from "./components/MessageCreate";
import UserList from "./components/UserList";
import UserInvite from "./components/UserInvite";
import {
  chatUpdate,
  createChatAsync,
  createMessageAsync,
  listChatMessagesAsync,
  listChatsAsync,
  listUsersAsync,
} from "./api";
import React from "react";

export default function App() {
  const [user, setUser] = useState<User>();
  const [userList, setUserList] = useState<User[]>();
  const [activeChat, setActiveChat] = useState<Chat>();
  const [chatList, setChatList] = useState<Chat[]>();
  const [chatMembers, setChatMembers] = useState<User[]>();
  const [chatNoMembers, setChatNoMembers] = useState<User[]>();
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (typeof storedUser == "undefined") {
      setUser(JSON.parse(storedUser!));
    }
  }, []);

  useEffect(() => {
    if (user) {
      listChatsAsync(user.id).then((chatList) => setChatList(chatList));
      listUsersAsync().then((users) => setUserList(users));
    }
  }, [user]);

  useEffect(() => {
    if (activeChat) {
      listUsersAsync().then((users) => {
        setChatMembers(
          users.filter((user) => activeChat.userIds.includes(user.id))
        );
        setChatNoMembers(
          users.filter((user) => !activeChat.userIds.includes(user.id))
        );
      });
      listChatMessagesAsync(activeChat?.id).then((messages) =>
        setMessages(messages)
      );
    }
  }, [activeChat]);

  async function handleChatCreate(chatTitle: string) {
    if (user) {
      try {
        await createChatAsync(chatTitle, user!.id);
        const chatList = await listChatsAsync(user.id);
        setChatList(chatList);
      } catch (err) {
        console.log(err);
        const chatList = await listChatsAsync(user.id);
        setChatList(chatList);
      }
    }
  }

  async function handleAddChatUser(user: User) {
    if (user && activeChat) {
      const updatedChat = await chatUpdate(activeChat, user.id);
      setActiveChat(updatedChat);
    }
  }

  async function handleSendMessage(message: string) {
    if (user && activeChat) {
      await createMessageAsync(activeChat.id, user.id, message);
      const messages = await listChatMessagesAsync(activeChat?.id);
      setMessages(messages);
    }
  }

  async function login(username: string) {
    const userList = await listUsersAsync();
    const filtered = userList.filter((user) => user.name === username);
    if (filtered.length > 0) {
      const newUser = filtered[0];
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(newUser);
    }
  }

  function logout() {
    window.localStorage.removeItem("user");
    setUser(undefined);
    setUserList(undefined);
    setChatList(undefined);
    setActiveChat(undefined);
    setChatMembers(undefined);
    setChatNoMembers(undefined);
    setMessages(undefined);
  }

  if (user) {
    return (
      <Container className="chat-container">
        <div className="chat-header bg-main">
          {/* Aufgabe 2 - Benutzername 
              
              Wenn der Benutzer bekannt ist - das wird oben im if(user) überprüft - wird nun dieser Teil eingeblendet. 
              Deswegen sieht die Seite nun komplett anders aus.
          
              Stelle nun den Benutzername dar: Hallo <BENUTZERNAME>.  
              <BENUTZERNAME> steht für den Namen, den du für die Anmeldung genutzt hast. 

              Hinweis:
              Du brauchst nur 'Aufgabe 2' mit dem richtigen Code zu ersetzen.
              'user' ist ein objekt mit mehreren Eigenschaften. Eine Eigenschaft davon ist der Name des Benutzers.
              Mit user.name kannst du im Code auf den namen zugreifen.
          */}
          {/* Lösung 2 - start */}
          <Header size="large">Hallo {'Aufgabe 2'}</Header>
          {/* Lösung 2 - end */}
          

          {/* Aufgabe 3 - Logout 

              Nun möchten wir uns wieder Abmelden können. 
              Im Moment passiert noch nichts, ausser dass wieder ein Fenster erscheint.
              
              Ändere den Code so, dass die Methode mit dem namen 'logout' aufgerufen wird, wenn du den Kopf drückst.
              
              Hinweis:
              Wenn du den Knopf drückst, dann wird die Methode aufgerufen, welche bei onCLick={HIER} steht. 
          */}
          {/* Lösung 3 - start */}
          <Button 
            className="br-16" 
            color="violet" 
            size="large" 
            onClick={alert('Aufgabe 3')}
          >
            Logout
          </Button>
          {/* Lösung 3 - end */}
          
        </div>

        <Grid divided className="grid-container bg-main">
          <Grid.Column className="grid-w-4 no-shadow" width="4">
            <div className="wrapper br-32 bg-white">
              <Header size="large">Chats</Header>
              {/* Aufgabe 4 - Chat Liste

                  Nun möchten wir hier die Chats darstellen, bei welchen du dabei bist. Die Überschrift ist bereits da. 
                  
                  Deine Aufgabe ist es nun die <ChatList .../> im Lösungsbereich einzufügen. Die ... sind bloss Plazuhalter für diese Beschreibung.

                  ChatList ist eine vorgefertigter Baustein - in der Fachsprache 'Komponente' genannt - welchen du benutzen kannst.
                  
                  Damit das Programm dann zufrieden ist, musst du dem Baustein noch zwei Eigenschaften, bei den ..., mitgeben:
                  - chatList: ist eine Liste mit den Chate, bei welchen du dabei bist
                    => füge hier die bereits existierende liste namens chatList ein - ja, die heissen gleich
                  - setActiveChat: ist eine Methode die aufgerufen wird, wenn du einen Chat in der Liste anklickst
                    => füge hier diie bereits existierende Methode namens setActiveChat ein - ja, auch die heissen gleich ;)

                  Hinweis:
                  Du hast so etwas änliches bereits in den vorangehenden Aufgaben gemacht (s. onClick)

              */}
              {/* Lösung 4 - start */}

              {/* Lösung 4 - end */}

              {/* Aufgabe 8 - Chat erzeugen

                  Wir können nun nachrichten in den bestehenden Chat schreiben. Natürlich möchten wir auch neue Chats erzeugen können.

                  Füge imLösungsbereich den Baustein <ChatCreate .../> ein.

                  Auch hier müssen wir, bei den ..., eine Eigenschaft hinschreiben:
                  - onChatCreate: wir aufgerufen wenn der benutzer den namen für den neuen Chat eingegeben hat und auf 'Erstellen' geklickt hat
                    => verweise hier auf die bestehende Methode handleChatCreate
                  
                  Hinweis:
                  Auch das hast du bereits bei ChatList gemacht ;)

              */}
              {/* Lösung 8 - start */}

              {/* Lösung 8 - end */}
            </div>
          </Grid.Column>

          {activeChat &&
          messages &&
          chatMembers &&
          chatNoMembers &&
          userList ? (
            <>
              <Grid.Column
                className="wrapper br-32 bg-white no-shadow"
                width="8"
              >
                <Header size="large">{activeChat.title}</Header>
                {/* Aufgabe 5 - Meldungen auflisten
                
                    Nun möchten wir gerne sehen, welche Meldungen in dem gewählten Chat da sind. Der Titel vom chat wird bereits angezeigt.

                    Füge nun im Lösungsbereich den Baustein <MessageList .../> ein. Gib die beiden Eigenschften mit:
                    - messages: die liste der meldungen, die angezeigt werden sollen
                      => verweise hier auf die bereist bestehende liste namens 'messages'
                    - userList: die Liste der Chat Teilnehmer
                      => auch hier kannst du auf die bereits bestehende 
                */}
                {/* Lösung 5 - start */}

                {/* Lösung 5 - end */}

                {/* Aufgabe 6 - Nachricht schreiben

                    Was ist schon ein Chat, wenn man keine Nachrichten posten kann? Das müssen wir ändern!

                    Füge im Lösungsbereich den Baustein <MessageCreate .../> ein. Dieser benötigt eine Eigenschaft:
                    - onSentMessage: diese Methode wird aufgerufen, wenn du auf 'Senden' klickst
                      => hier musst du auf die Methode namens 'handleSendMessage' verweisen
                */}
                {/* Lösung 6 - start */}

                {/* Lösung 6 - end */}

              </Grid.Column>
              <Grid.Column className="grid-w-4 no-shadow" width="4">
                <div className="wrapper br-32 bg-white">
                  <Header size="large">Teilnehmer</Header>
                  {/* Aufgabe 7 - Teilnehmer
                      
                      Wer ist denn eigentlich alles bei diesem Chat mit dabei?

                      Füge eine Zeile im Lösungsberich den Baustein <UserList .../> ein. Hier sind die folgenden Eigendschften benötigt:
                      - users: Eine Liste der der im Chat beteiligten Personen.
                        => hier kannst du die Liste 'chatMembers' übergeben.
                      - userList: Die Liste mit Informationen über sämtliche Benutzer. Hier sind auch die Namen für die Anzeige enthalten.
                        => verweise auf die bereits bestehende Liste mit demselben Namen.
                  */}
                  {/* Lösung 7 - start */}

                  {/* Lösung 7 - end */}

                  <Header size="large">Hinzufügen</Header>
                  {/* Aufgabe 9 - Benutzer hinzufügen

                      Natürlich möchten wir auch andere Benutzer zu dem gewählten Chat hinzufügen können.

                      Füge nach den Baustein <UserInvite .../> im Lösungsbereich ein. Hier sind die folgenden Eigenschften benötigt:
                      - users: Eine Liste der NICHT im Chat beteiligten Personen.
                        => hier kannst du die Liste 'chatNoMembers' übergeben.
                      - onAddChatUser: Diese Funktion wird aufgerufen, wenn du einen neuen Benutzer hinzufügen willst.
                        => verweise auf die Funktion 'handleAddChatUser'
                  */}
                  {/* Lösung 9 - start */}

                  {/* Lösung 9 - end */}
                </div>
              </Grid.Column>
            </>
          ) : (
            <Grid.Column className="br-32  no-shadow" width="8">
              <Header size="large">Wähle ein Chat aus</Header>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container>
        {/* Aufgabe 1 - Login

            Hier wird jetzt das Fenster angezeigt, sobald du den Knopf drückst.
            
            Ändere den Inhalt in {} so, dass die Methode mit dem Namen 'login' aufgerufen wird und nicht mehr alert.

            Hinweis:
            Wenn du den Knopf drückst, dann wird die Methode aufgerufen, welche bei onCLick={HIER} steht. 
        */}
        {/* Lösung 1 - start */}
        <Login onLogin={login} />
        {/* Lösung 1 - end */}
        {/* Example 1
        <Login onLogin={alert('HIER')} />
        Example 1 */}
      </Container>
    );
  }
}
