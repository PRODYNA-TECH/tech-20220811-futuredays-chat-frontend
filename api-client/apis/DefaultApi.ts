/* tslint:disable */
/* eslint-disable */
/**
 * Futureday Chat
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Chat,
  ChatCreate,
  Message,
  MessageCreate,
  User,
  UserCreate,
} from '../models';
import {
    ChatFromJSON,
    ChatToJSON,
    ChatCreateFromJSON,
    ChatCreateToJSON,
    MessageFromJSON,
    MessageToJSON,
    MessageCreateFromJSON,
    MessageCreateToJSON,
    UserFromJSON,
    UserToJSON,
    UserCreateFromJSON,
    UserCreateToJSON,
} from '../models';

export interface ChatCreateRequest {
    chatCreate?: ChatCreate;
}

export interface ChatReadRequest {
    chatId: string;
}

export interface MessageCreateRequest {
    chatId: string;
    messageCreate?: MessageCreate;
}

export interface MessageListRequest {
    chatId: string;
}

export interface UserCreateRequest {
    userCreate?: UserCreate;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Add new chat
     */
    async chatCreateRaw(requestParameters: ChatCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Chat>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/chat`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChatCreateToJSON(requestParameters.chatCreate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChatFromJSON));
    }

    /**
     * Add new chat
     */
    async chatCreate(requestParameters: ChatCreateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Chat>> {
        const response = await this.chatCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List known chats.
     */
    async chatListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Chat>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/chat`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChatFromJSON));
    }

    /**
     * List known chats.
     */
    async chatList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Chat>> {
        const response = await this.chatListRaw(initOverrides);
        return await response.value();
    }

    /**
     * one specific chat
     */
    async chatReadRaw(requestParameters: ChatReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Chat>> {
        if (requestParameters.chatId === null || requestParameters.chatId === undefined) {
            throw new runtime.RequiredError('chatId','Required parameter requestParameters.chatId was null or undefined when calling chatRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/chat/{chatId}`.replace(`{${"chatId"}}`, encodeURIComponent(String(requestParameters.chatId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChatFromJSON(jsonValue));
    }

    /**
     * one specific chat
     */
    async chatRead(requestParameters: ChatReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Chat> {
        const response = await this.chatReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Add new message to chat
     */
    async messageCreateRaw(requestParameters: MessageCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Message>>> {
        if (requestParameters.chatId === null || requestParameters.chatId === undefined) {
            throw new runtime.RequiredError('chatId','Required parameter requestParameters.chatId was null or undefined when calling messageCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/chat/{chatId}/message`.replace(`{${"chatId"}}`, encodeURIComponent(String(requestParameters.chatId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MessageCreateToJSON(requestParameters.messageCreate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MessageFromJSON));
    }

    /**
     * Add new message to chat
     */
    async messageCreate(requestParameters: MessageCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Message>> {
        const response = await this.messageCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * list messages of chat
     */
    async messageListRaw(requestParameters: MessageListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Message>>> {
        if (requestParameters.chatId === null || requestParameters.chatId === undefined) {
            throw new runtime.RequiredError('chatId','Required parameter requestParameters.chatId was null or undefined when calling messageList.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/chat/{chatId}/message`.replace(`{${"chatId"}}`, encodeURIComponent(String(requestParameters.chatId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MessageFromJSON));
    }

    /**
     * list messages of chat
     */
    async messageList(requestParameters: MessageListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Message>> {
        const response = await this.messageListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Add new user to application
     */
    async userCreateRaw(requestParameters: UserCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/user`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserCreateToJSON(requestParameters.userCreate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * Add new user to application
     */
    async userCreate(requestParameters: UserCreateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.userCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List known users application
     */
    async userListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-functions-key"] = this.configuration.apiKey("x-functions-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/api/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * List known users application
     */
    async userList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.userListRaw(initOverrides);
        return await response.value();
    }

}
