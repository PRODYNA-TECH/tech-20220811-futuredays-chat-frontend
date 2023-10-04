import _ from "lodash";
import { Chat, Configuration, DefaultApi } from "./api-client";

const apiClient = new DefaultApi(
  new Configuration({
    apiKey: "-HVJ6BwAHlOOiaQRYIWA-0vWtvSD2JGJLeKm6M199JbwAzFuhWnfDg==",
    basePath: "https://futureday.azurewebsites.net",
  })
);

export async function listChatsAsync(userId: string) {
  const chatList = await apiClient.userChatList({ userId });
  return chatList;
}

export async function listUsersAsync() {
  const userList = await apiClient.userList();
  const sorted = _.orderBy(
    userList,
    [(user) => user.name.toLocaleLowerCase()],
    ["asc"]
  );
  return sorted;
}

export async function listChatMessagesAsync(chatId: string) {
  const messages = await apiClient.messageList({ chatId });
  return messages;
}

export async function createChatAsync(chatTitle: string, userId: string) {
  await apiClient.chatCreate({
    chatCreate: { title: chatTitle, userIds: [userId] },
  });
}

export async function createMessageAsync(
  chatId: string,
  userId: string,
  message: string
) {
  await apiClient.messageCreate({
    chatId,
    messageCreate: { body: message, userId },
  });
}

export async function chatUpdate(chat: Chat, userId: string) {
  const updatedChat = await apiClient.chatUpdate({
    chatId: chat.id,
    chat: {
      id: chat.id,
      title: chat.title,
      userIds: chat.userIds.concat(userId),
    },
  });
  return updatedChat;
}
