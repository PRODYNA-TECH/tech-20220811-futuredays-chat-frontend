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

export default function App() {
  const [user, setUser] = useState<User>();
  const [userList, setUserList] = useState<User[]>();
  const [activeChat, setActiveChat] = useState<Chat>();
  const [chatList, setChatList] = useState<Chat[]>()
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
        setChatMembers(users.filter((user) => activeChat.userIds.includes(user.id)))
        setChatNoMembers(users.filter((user) => !activeChat.userIds.includes(user.id)))
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

  // Aufgabe 1 - login
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
              
              Wenn der Benutzer bekannt ist - das wird oben im if(user) ??berpr??ft - wird nun dieser Teil eingeblendet. 
              Deswegen sieh die Seite nun komplett anders aus.
          
              Stelle nun den Benutzername dar: Hallo <BENUTZERNAME>.  
              <BENUTZERNAME> steht f??r den Namen, den du f??r die Anmeldung genutzt hast. 

              Hinweis:
              Du brauchst nur 'Aufgabe 2' mit dem richtigen Code zu ersetzen.
              'user' ist ein objekt mit mehreren Eigenschaften. Eine Eigenschaft davon ist der Name des Benutzers.
              Mit user.name kannst du im Code auf den namen zugreifen.

              TODO: Hallo {'Aufgabe 2'}
          */}
          <Header size="large">Hallo {user.name}</Header>

          {/* Aufgabe 3 - Logout 

              Nun m??chten wir uns wieder Abmelden k??nnen. 
              Im Moment passiert noch nichts, ausser dass wieder ein Fenster erscheint.
              
              ??ndere den Code so, dass die Methode mit dem namen 'logout' aufgerufen wird, wenn du den Kopf dr??ckst.
              
              Hinweis:
              Wenn du den Knopf dr??ckst, dann wird die Methode aufgerufen, welche bei onCLick={HIER} steht. 

              TODO: {alert('Aufgabe 3')}
          */}
          <Button
            className="br-16"
            color="violet"
            size="large"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        <Grid divided className="grid-container bg-main">
          <Grid.Column className="grid-w-4 no-shadow" width="4">
            <div className="wrapper br-32 bg-white">
              {/* Aufgabe 4 - Chat Liste

                  Nun m??chten wir hier die Chats darstellen, bei welchen du dabei bist. Die ??berschrift ist bereits da. 
                  
                  Deine Aufgabe ist es nun die <ChatList .../> unter <Header .../> einzuf??gen. Die ... sind bloss Plazuhalter f??r diese Beschreibung.

                  ChatList ist eine vorgefertigter Baustein - in der Fachsprache 'Komponente' genannt - welchen du benutzen kannst.
                  
                  Damit das Programm dann zufrieden ist, musst du dem Baustein noch zwei Eigenschaften, bei den ..., mitgeben:
                  - chatList: ist eine Liste mit den Chate, bei welchen du dabei bist
                    => f??ge hier die bereits existierende liste namens chatList ein - ja, die heissen gleich
                  - setActiveChat: ist eine Methode die aufgerufen wird, wenn du einen Chat in der Liste anklickst
                    => f??ge hier diie bereits existierende Methode namens setActiveChat ein - ja, auch die heissen gleich ;)

                  Hinweis:
                  Du hast so etwas ??nliches bereits in den vorangehenden Aufgaben gemacht (s. onClick)

                  TODO: remove chatList

              */}
              <Header size="large">Chats</Header>
              <ChatList chatList={chatList!} setActiveChat={setActiveChat} />
              {/* Aufgabe 8 - Chat erzeugen

                  Wir k??nnen nun nachrichten in den bestehenden Chat schreiben. Nat??rlich m??chten wir auch neue Chats erzeugen k??nnen.

                  F??ge nach diesem Kommentar und vor </div> den Baustein <ChatCreate .../> ein.

                  Auch hier m??ssen wir, bei den ..., eine Eigenschaft hinschreiben:
                  - onChatCreate: wir aufgerufen wenn der benutzer den namen f??r den neuen Chat eingegeben hat und auf 'Erstellen' geklickt hat
                    => verweise hier auf die bestehende Methode handleChatCreate
                  
                  Hinweis:
                  Auch das hast du bereits bei ChatList gemacht ;)

                  TODO: remove ChatCreate
              */}
              <ChatCreate onChatCreate={handleChatCreate} />
            </div>
          </Grid.Column>

          {activeChat && messages && chatMembers && chatNoMembers && userList ? (
            <>
              <Grid.Column
                className="wrapper br-32 bg-white no-shadow"
                width="8"
              >
                {/* Aufgabe 5 - Meldungen auflisten
                
                    Nun m??chten wir gerne sehen, welche Meldungen in dem gew??hlten Chat da sind. Der Titel vom chat wird bersits angezeigt.

                    F??ge nun nach <Header .../> in einer neuen Zeile den Baustein <MessageList .../> ein. Gib die beiden Eigenschften mit:
                    - messages: die liste der meldungen, die angezeigt werden sollen
                      => verweise hier auf die bereist bestehende liste namens 'messages'
                    - userList: die Liste der Chat Teilnehmer
                      => auch hier kannst du auf die bereits bestehende 

                    TODO remove MessageList
                */}
                <Header size="large">{activeChat.title}</Header>
                <MessageList messages={messages} userList={userList} />
                {/* Aufgabe 6 - Nachricht schreiben

                    Was ist schon ein Chat, wenn man keine Nachrichten posten kann? Das m??ssen wir ??ndern!

                    F??ge eine Zeile vor </Grid.Column> den Baustein <MessageCreate .../> ein. Dieser ben??tigt eine Eigenschaft:
                    - onSentMessage: diese Methode wird aufgerufen, senn due auf 'Senden' klickst
                      => hier musst du auf die Methode namens 'handleSendMessage' verweisen

                    TODO remove Message Create
                */}
                <MessageCreate onSendMessage={handleSendMessage} />
              </Grid.Column>
              <Grid.Column className="grid-w-4 no-shadow" width="4">
                <div className="wrapper br-32 bg-white">
                  {/* Aufgabe 7 - Teilnehmer
                      
                      Wer ist denn eigentlich alles bei diesem Chat mit dabei?

                      F??ge eine Zeile nach <Header .../> den Baustein <UserList .../> ein. Hier sind die folgenden Eigendschften ben??tigt:
                      - users: Eine Liste der der im Chat beteiligten Personen.
                        => hier kannst du die Liste 'chatMembers' ??bergeben.
                      - userList: Die Liste mit Informationien ??ber s??mtliche Benutzer. Hier sind auch die Namen f??r die Anzeige enthalten.
                        => verweise auf die bereits bestehende Liste mit demselben Namen.
                  
                        TODO: remove UserList 
                  */}
                  <Header size="large">Teilnehmer</Header>
                  <UserList users={chatMembers} />
                  {/* Aufgabe 9 - Benutzer hinzuf??gen

                      Nat??rlich m??chten wir auch andere Benutzer zu dem gew??hlten Chat hinzuf??gen k??nnen.

                      F??ge nach <Header .../> den Baustein <UserInvite .../> ein. Hier sind die folgenden Eigendschften ben??tigt:
                      - users: Eine Liste der NICHT im Chat beteiligten Personen.
                        => hier kannst du die Liste 'chatNoMembers' ??bergeben.
                      - onAddChatUser: Diese Funktion wird aufgerufen, wenn du einen neuen Benutzer hinzuf??gen willst.
                        => verweise auf die Funktion 'handleAddChatUSer'

                      TODO: remove UserInvite
                   */}
                  <Header size="large">Hinzuf??gen</Header>
                  <UserInvite
                    users={chatNoMembers}
                    onAddChatUser={handleAddChatUser}
                  />
                </div>
              </Grid.Column>
            </>
          ) : (
            <Grid.Column className="br-32  no-shadow" width="8">
              <Header size="large">W??hle ein Chat aus</Header>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container>
        {/* Aufgabe 1 - Login

            Hier wird jetzt das Fenster angezeigt, sobald du den Knopf dr??ckst.
            
            ??ndere den Inhalt in {} so, dass die Methode mit dem Namen 'login' aufgerufen wird und nicht mehr alert.

            Hinweis:
            Wenn du den Knopf dr??ckst, dann wird die Methode aufgerufen, welche bei onCLick={HIER} steht. 

            TODO: alert('Aufgabe 1')
        */}
        <Login onLogin={login} />
      </Container>
    );
  }
}
